import Keycloak from 'keycloak-js'
import { isEmpty } from 'lodash'
import { logging } from '@ms7/logger'
import { AuthModel, UserInfo } from '../auth-provider'

export interface KeycloakConfig {
    url: string,
    realm: string,
    clientId: string,
}

class KeycloakAuth implements AuthModel {
    private readonly logger = logging.getLogger('keycloak')
    private readonly config: KeycloakConfig
    private readonly allowLogger: boolean

    private keycloak: Keycloak.KeycloakInstance | undefined = undefined
    private tokenRefreshRunner: number | undefined
    private _isAuthenticated = false

    constructor(config: KeycloakConfig, allowLogger = true) {
        this.config = config
        this.allowLogger = allowLogger
    }

    public init(): void {
        // if(isEmpty(this.config.realm) || isEmpty(this.config.clientId))
        //     throw new Error(`Keycloak - ${KeycloakAuth.getConfigError(this.config)}`)
        this.keycloak = new Keycloak(this.config)
        this.startEventWatcher()

        this.logger.debug('Service started', this.config)
    }

    public async login(): Promise<boolean> {
        if(!this.keycloak) return false

        return await this.keycloak
            .init({ onLoad: 'login-required' })
            .then((isAuthenticated: boolean) => {
                this._isAuthenticated = isAuthenticated

                if(isAuthenticated)
                    this.startTokenRefreshRunner()

                return true
            })
            .catch(error => {
                this.logger.error('Service offline', error)

                throw new Error('Keycloak - Service offline')
            })
    }

    public async logout(): Promise<void> {
        if(this.tokenRefreshRunner)
            window.clearInterval(this.tokenRefreshRunner)

        window.location.replace(this.getLogoutUrl())
    }

    public async validate(): Promise<void> {
        if(!this.keycloak)
            return

        //TODO: is there a point in validation token on client side???

        // const baseUrl = KeycloakAuth.getKeycloakBaseUrl()
        // if(!baseUrl)
        //     return
        //
        // await getUserInfo(baseUrl)
        //     .then(res => {
        //         if(res.status === 401)
        //             this.logout()
        //     })
        //     .catch(() => {
        //         this.logout()
        //     })
    }

    public isAuthenticated(): boolean {
        return this._isAuthenticated
    }

    public getToken(): string | undefined {
        return this.keycloak?.token
    }

    public hasRole(role: string): boolean {
        return this.keycloak?.hasRealmRole(role) || false
    }

    public getUserInfo(): UserInfo {
        return {
            name: this.keycloak?.idTokenParsed?.name,
            email: this.keycloak?.idTokenParsed?.email,
            username: this.keycloak?.idTokenParsed?.preferred_username,
        }
    }

    private startTokenRefreshRunner(): number | undefined {
        if(!this.keycloak || !this.keycloak.tokenParsed) return

        const tokenParsed = this.keycloak.tokenParsed
        const interval: number = ((tokenParsed.exp || 0) - (tokenParsed.iat || 0))
        if(interval <= 0) return

        // run every [Access Token Lifespan expire time - 20%] seconds,
        // ex. ATL = 300s so interval will run every 250s
        this.tokenRefreshRunner = window.setInterval(async () => {
            await this.keycloak?.updateToken((interval / 2))
                .catch(() => {
                    this.logout()
                })
        }, ((interval / 1.2) * 1000))
    }

    private startEventWatcher(): void {
        if(!this.keycloak || !this.allowLogger) return

        this.keycloak.onReady = isAuthenticated => {
            this.logger.debug('onReady event received', { isAuthenticated })
        }

        this.keycloak.onAuthSuccess = () => {
            this.logger.debug('onAuthSuccess event received')
        }

        this.keycloak.onAuthError = errorData => {
            this.logger.debug('onAuthError event received', errorData)
        }

        this.keycloak.onAuthRefreshSuccess = () => {
            this.logger.debug('onAuthRefreshSuccess event received')
        }

        this.keycloak.onAuthRefreshError = () => {
            this.logger.debug('onAuthRefreshError event received')
        }

        this.keycloak.onAuthLogout = () => {
            this.logger.debug('onAuthLogout event received')
        }

        this.keycloak.onTokenExpired = () => {
            this.logger.debug('onTokenExpired event received')
        }
    }

    private getLogoutUrl(): URL {
        const baseUrl = window.location.origin
        const keycloakBaseUrl = this.getKeycloakBaseUrl()

        if(!baseUrl || !keycloakBaseUrl) throw new Error(`Cannot construct keycloak logout url, baseUrl: ${baseUrl}, keycloakBaseUrl: ${keycloakBaseUrl}`)

        return new URL(this.keycloak?.createLogoutUrl() || `${keycloakBaseUrl}/logout?redirect_uri=${baseUrl}`)
    }

    private getKeycloakBaseUrl(): string | undefined {
        const { url, realm } = this.config

        return `${url}/realms/${realm}/protocol/openid-connect`
    }

    private static getConfigError(config: KeycloakConfig): string {
        if(!config) return 'Empty config'

        if(isEmpty(config.url)) return 'Missing `url`'

        if(isEmpty(config.realm)) return 'Missing `realm`'

        if(isEmpty(config.clientId)) return 'Missing `clientId`'

        return 'Unknown error'
    }
}

export default KeycloakAuth
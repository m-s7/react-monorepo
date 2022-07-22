import { AuthModel, LoginCredentials, UserInfo } from '../types'
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, UserCredential, AuthError, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { logging } from '@ms7/logger'
import firebase from 'firebase/compat'

class FirebaseAuth implements AuthModel {
    private readonly logger = logging.getLogger('firebase')
    private readonly options: FirebaseOptions

    private firebase: FirebaseApp | undefined = undefined
    private _token: string | undefined
    private _isAuthenticated = false
    private _userCredential: UserCredential | undefined

    constructor(options: FirebaseOptions) {
        this.options = options
    }

    public init(): void {
        this.firebase = initializeApp(this.options)

        this.logger.debug('Service started', this.options)
    }

    public async login(credentials: LoginCredentials): Promise<boolean> {
        const { email, password } = credentials
        const auth = getAuth(this.firebase)
        await setPersistence(auth, browserLocalPersistence)

        return await signInWithEmailAndPassword(getAuth(this.firebase), email, password)
            .then((userCredential: UserCredential) => {
                this._token = userCredential.user.refreshToken
                this._isAuthenticated = true
                this._userCredential = userCredential

                return true
            })
            .catch((authError: AuthError) => {
                // simplify messages to allow simple translations
                let message = authError.message
                if(message.includes('auth/user-not-found')) message = 'user-not-found'
                if(message.includes('auth/wrong-password')) message = 'user-not-found'
                if(message.includes('auth/invalid-email')) message = 'user-not-found'
                if(message.includes('auth/internal-error')) message = 'user-not-found'
                if(message.includes('auth/network-request-failed')) message = 'network-request-failed'

                this.logger.error('Login error', authError.message)

                throw new Error(message)
            })
    }

    public logout(): Promise<void> {
        return signOut(getAuth(this.firebase))
            .then(() => {
                this._token = undefined
                this._isAuthenticated = false
                this._userCredential = undefined
            })
            .catch(error => {
                this.logger.error('Logout error', error)

                throw new Error(error)
            })
    }

    public getToken(): string | undefined {
        return this._userCredential?.user.refreshToken
    }

    public getUserInfo(): UserInfo {
        return {
            name: this._userCredential?.user.displayName || this._userCredential?.user.email || '',
            email: this._userCredential?.user.email || '',
            username: this._userCredential?.user.displayName || this._userCredential?.user.email || '',
        }
    }

    // since firebase does not support roles out of the box, authenticated user has every role access
    public hasRole(role: string): boolean {
        return this.isAuthenticated()
    }

    public isAuthenticated(): boolean {
        return this._isAuthenticated
    }

    public validate(): void {
        // ignored
    }
}

export default FirebaseAuth
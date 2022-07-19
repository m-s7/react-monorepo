import React, { useEffect, useState } from 'react'
import KeycloakAuth, { KeycloakConfig } from './keycloak-auth'
import { AuthProviderComponentProps } from '../auth-provider'

type KeycloakErrorComponentType = React.ComponentType<{ error: Error }>
type KeycloakSuspenseComponentType = React.ComponentType

export interface KeycloakAuthProviderProps {
    config: KeycloakConfig,
    errorComponent: KeycloakErrorComponentType,
    suspenseComponent: KeycloakSuspenseComponentType,
    onAuthenticatedHandler?: (token: string | undefined, logoutMethod: () => void) => void,
    allowLogger?: boolean,
}

export const KeycloakAuthProvider = (props: AuthProviderComponentProps) => {
    const { config, errorComponent, suspenseComponent, onAuthenticatedHandler, allowLogger } = (props.providerProps as KeycloakAuthProviderProps)

    let keycloakAuth: KeycloakAuth
    const [error, setError] = useState<Error>()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if(keycloakAuth) return

        keycloakAuth = new KeycloakAuth(config, (isAuthenticated, error) : void => {
            setIsAuthenticated(isAuthenticated)
            setError(error)

            if(isAuthenticated) {
                const token = keycloakAuth.getToken()

                if(onAuthenticatedHandler) onAuthenticatedHandler(token, keycloakAuth.getLogoutUrl)
            }
        }, allowLogger)

        keycloakAuth.init().then()
        props.onLoad(keycloakAuth)
    }, [])

    if(!isAuthenticated) {
        const ErrorComponent = errorComponent
        const SuspenseComponent = suspenseComponent

        if(error) return (<ErrorComponent error={error} />)
        else return (<SuspenseComponent />)
    }
    
    return (<>{props.children}</>)
}

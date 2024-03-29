import React, { useEffect, useState } from 'react'
import KeycloakAuth, { KeycloakConfig } from './keycloak-auth'
import { AuthProviderComponentProps } from '../types'

type KeycloakErrorComponentType = React.ComponentType<{ error: Error }>
type KeycloakSuspenseComponentType = React.ComponentType

export interface KeycloakAuthProviderProps {
    config: KeycloakConfig,
    errorComponent: KeycloakErrorComponentType,
    suspenseComponent: KeycloakSuspenseComponentType,
}

export const KeycloakAuthProvider = (props: AuthProviderComponentProps<KeycloakAuthProviderProps>) => {
    const { config, errorComponent, suspenseComponent } = props.providerProps

    let keycloakAuth: KeycloakAuth
    const [error, setError] = useState<Error>()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if(keycloakAuth) return

        keycloakAuth = new KeycloakAuth(config)
        keycloakAuth.init()
        keycloakAuth.login()
            .then(isAuthenticated => {
                setIsAuthenticated(isAuthenticated)
            })
            .catch(error => {
                setError(error)
            })
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

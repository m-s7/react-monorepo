import { KeycloakConfig } from '@/business/auth/keycloak-auth'
import React, { createContext, useState } from 'react'

interface Props {
    config: KeycloakConfig,
    provider: AuthProviderComponentType,
    children: React.ReactNode | React.ReactNode[],
}

export interface Auth {
    init(): void,
    validate(): void,
    logout(): void,
    getToken(): string | undefined,
    hasRole(role: string): boolean,
    isAuthenticated(): boolean,
}

export interface AuthProviderComponentProps {
    config: KeycloakConfig,
    onLoad: (authInstance: Auth) => void,
    children: React.ReactNode | React.ReactNode[],
}

type AuthProviderComponentType = React.ComponentType<AuthProviderComponentProps>
// type AuthProviderComponentType<K extends string = string> = React.ForwardRefExoticComponent<AuthProviderComponentProps<K> & React.RefAttributes<boolean>>

export const AuthProviderContext = createContext<Auth | undefined>(undefined)

const AuthProvider = (props: Props) => {
    const [providerAuthInstance, setProviderAuthInstance] = useState<Auth>()

    const onLoad = (authInstance: Auth) => {
        if(!providerAuthInstance)
            setProviderAuthInstance(authInstance)
    }

    const Provider = props.provider
    return (
        <React.Fragment>
            <Provider
                config={props.config}
                onLoad={authInstance => onLoad(authInstance)}>
                {providerAuthInstance &&
                    <AuthProviderContext.Provider value={providerAuthInstance}>
                        {props.children}
                    </AuthProviderContext.Provider>
                }
            </Provider>
        </React.Fragment>
    )
}

export default AuthProvider

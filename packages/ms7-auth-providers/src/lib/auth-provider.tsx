import React, { createContext, useState } from 'react'

interface AuthProviderProps<T> {
    providerProps: T,
    provider: React.ComponentType<AuthProviderComponentProps<T>>,
}

export interface AuthProviderComponentProps<T> extends React.PropsWithChildren {
    providerProps: T,
    onLoad: (authInstance: AuthModel) => void,
}

export interface LoginCredentials {
    email: string,
    password: string,
}

export interface AuthModel {
    init(): void,
    login(credentials?: LoginCredentials): Promise<boolean>,
    logout(): Promise<void>,
    validate(): void,
    getToken(): string | undefined,
    hasRole(role: string): boolean,
    isAuthenticated(): boolean,
    getUserInfo(): UserInfo,
}

export interface UserInfo {
    username: string,
    name?: string,
    email?: string,
}

export const AuthProviderContext = createContext<AuthModel | undefined>(undefined)

export const AuthProvider = <T, >(props: React.PropsWithChildren<AuthProviderProps<T>>) => {
    const [providerAuthInstance, setProviderAuthInstance] = useState<AuthModel>()

    const onLoad = (authInstance: AuthModel) => {
        if(!providerAuthInstance)
            setProviderAuthInstance(authInstance)
    }

    const Provider = props.provider
    return (
        <Provider
            providerProps={props.providerProps}
            onLoad={authInstance => onLoad(authInstance)}>
            {providerAuthInstance &&
                <AuthProviderContext.Provider value={providerAuthInstance}>
                    {props.children}
                </AuthProviderContext.Provider>
            }
        </Provider>
    )
}

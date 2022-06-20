import React, { createContext, useState } from 'react'

interface Props<T> {
    providerProps: T,
    provider: AuthProviderComponentType,
}

export interface AuthProviderComponentProps extends React.PropsWithChildren<any> {
    providerProps: any,
    onLoad: (authInstance: AuthModel) => void,
}

type AuthProviderComponentType = React.ComponentType<AuthProviderComponentProps>
// type AuthProviderComponentType<K extends string = string> = React.ForwardRefExoticComponent<AuthProviderComponentProps<K> & React.RefAttributes<boolean>>

export interface AuthModel {
    init(): void,
    validate(): void,
    getLogoutUrl(): URL,
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

export const AuthProvider = <T, >(props: React.PropsWithChildren<Props<T>>) => {
    const [providerAuthInstance, setProviderAuthInstance] = useState<AuthModel>()

    const onLoad = (authInstance: AuthModel) => {
        if(!providerAuthInstance)
            setProviderAuthInstance(authInstance)
    }

    const Provider = props.provider
    return (
        <React.Fragment>
            <Provider
                providerProps={props.providerProps}
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

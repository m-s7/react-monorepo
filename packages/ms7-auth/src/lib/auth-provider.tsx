import React, { createContext, useState } from 'react'
import { AuthModel, AuthProviderComponentProps } from './types'

interface AuthProviderProps<T> {
    providerProps: T,
    provider: React.ComponentType<AuthProviderComponentProps<T>>,
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

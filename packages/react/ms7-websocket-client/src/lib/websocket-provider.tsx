import React, { createContext, useState } from 'react'

interface Props {
    provider: WebsocketProviderComponentType,
}

export interface Websocket {
    connect(): void,
    disconnect(): void,
    onConnecting(): void,
    onConnected(): void,
    onDisconnected(): void,
    onConnectionClosed(): void,
    isConnected(): boolean,
    getName(): string,
}

export interface WebsocketProviderComponentProps extends React.PropsWithChildren {
    onLoad: (authInstance: Websocket) => void,
}

type WebsocketProviderComponentType = React.ComponentType<WebsocketProviderComponentProps>
// type AuthProviderComponentType<K extends string = string> = React.ForwardRefExoticComponent<AuthProviderComponentProps<K> & React.RefAttributes<boolean>>

export const WebsocketProviderContext = createContext<Websocket | undefined>(undefined)

export const WebsocketProvider = (props: React.PropsWithChildren<Props>) => {
    const [providerWebsocketInstance, setProviderWebsocketInstance] = useState<Websocket>()

    const onLoad = (websocketInstance: Websocket) => {
        if(!providerWebsocketInstance)
            setProviderWebsocketInstance(websocketInstance)
    }

    const Provider = props.provider
    return (
        <React.Fragment>
            <Provider
                onLoad={websocketInstance => onLoad(websocketInstance)}>
                {providerWebsocketInstance &&
                    <WebsocketProviderContext.Provider value={providerWebsocketInstance}>
                        {props.children}
                    </WebsocketProviderContext.Provider>
                }
            </Provider>
        </React.Fragment>
    )
}

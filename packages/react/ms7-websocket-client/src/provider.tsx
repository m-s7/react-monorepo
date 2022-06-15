import React, { createContext, useState } from 'react'

interface Props {
    provider: WebsocketProviderComponentType,
}

interface Websocket {
    connect(): void,
    disconnect(): void,
}

export interface WebsocketProviderComponentProps extends React.PropsWithChildren<any> {
    onLoad: (authInstance: Websocket) => void,
}

type WebsocketProviderComponentType = React.ComponentType<WebsocketProviderComponentProps>
// type AuthProviderComponentType<K extends string = string> = React.ForwardRefExoticComponent<AuthProviderComponentProps<K> & React.RefAttributes<boolean>>

export const WebsocketProviderContext = createContext<Websocket | undefined>(undefined)

export const Provider = (props: React.PropsWithChildren<Props>) => {
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

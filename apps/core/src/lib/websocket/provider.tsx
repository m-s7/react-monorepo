import React, { createContext, useState } from 'react'

interface Props {
    provider: WebsocketProviderComponentType,
    children: React.ReactNode | React.ReactNode[],
}

export interface Websocket {
    connect(): void,
    disconnect(): void,
}

export interface WebsocketProviderComponentProps {
    children: React.ReactNode | React.ReactNode[],
    onLoad: (authInstance: Websocket) => void,
}

type WebsocketProviderComponentType = React.ComponentType<WebsocketProviderComponentProps>
// type AuthProviderComponentType<K extends string = string> = React.ForwardRefExoticComponent<AuthProviderComponentProps<K> & React.RefAttributes<boolean>>

export const WebsocketProviderContext = createContext<Websocket | undefined>(undefined)

const Provider = (props: Props) => {
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

export default Provider

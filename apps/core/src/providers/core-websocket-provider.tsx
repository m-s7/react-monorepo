import React, { useContext, useEffect, useState } from 'react'
import CoreWebsocketClient from 'Core/business/websocket-client'
import { AuthProviderContext } from '@ms7/auth'
import { FullPageSpinner, ModalOverlaySpinner } from '@ms7/ui'
import { WebsocketProviderComponentProps } from '@ms7/websocket'
import { env } from '@ms7/common'

const CoreWebsocketProvider = (props: WebsocketProviderComponentProps) => {
    const authContext = useContext(AuthProviderContext)
    const [showLoader, setShowLoader] = useState(true)
    const [isConnected, setIsConnected] = useState(false)
    const [hasConnected, setHasConnected] = useState(false)

    const { onLoad, children } = props

    useEffect(() => {
        const url = env.REACT_APP_CORE_WEBSOCKET_URL

        if(!url) throw new Error(`Invalid url, ${url}`)

        const token = authContext?.getToken()
        const callback = (isConnected: boolean): void => {
            setIsConnected(isConnected)
            if(isConnected) setHasConnected(true)
        }

        const websocketClient = new CoreWebsocketClient(callback, token, 'core', url)
        websocketClient.connect()

        onLoad(websocketClient)

        setShowLoader(false)

        return () => {
            websocketClient.disconnect()
        }
    }, [])

    if(!hasConnected && (showLoader || !isConnected))
        return (<FullPageSpinner useDefaults />)

    return (
        <>
            {children}
            <ModalOverlaySpinner show={(hasConnected && !isConnected)} />
        </>
    )
}

export default CoreWebsocketProvider
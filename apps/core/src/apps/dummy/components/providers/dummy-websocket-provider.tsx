import React, { useContext, useEffect, useState } from 'react'
import config from 'Dummy/configs/app'
import DummyWebsocketClient from 'Dummy/business/websocket-client'
import { setClient } from 'Dummy/store/reducers/websocket-reducer'
import { WebsocketClient } from '@ms7/websocket-client'
import { AuthProviderContext } from '@/components/providers/auth-provider'
import { useAppDispatch } from 'Dummy/hooks/use-app-dispatch'
import FullPageLoader from '@/components/full-page-loader'
import { WebsocketProviderComponentProps } from '@ms7/websocket-client'

const DummyWebsocketProvider = (props: WebsocketProviderComponentProps) => {
    let websocketClient: WebsocketClient | undefined

    const dispatch = useAppDispatch()
    const authContext = useContext(AuthProviderContext)
    const [showLoader, setShowLoader] = useState(true)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if(websocketClient) return

        const { websocket } = config
        if(websocket) {
            const { url, name, headers } = websocket

            const token = authContext?.getToken()
            const callback = (isConnected: boolean): void => { setIsConnected(isConnected) }

            websocketClient = new DummyWebsocketClient(callback, token, name, url, headers)
            websocketClient.connect()

            dispatch(setClient(websocketClient))

            props.onLoad(websocketClient)
        }

        setShowLoader(false)
    }, [])

    useEffect(() => () => {
        websocketClient?.disconnect()
        websocketClient = undefined
    }, [])

    if(showLoader || !isConnected)
        return (<FullPageLoader />)

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default DummyWebsocketProvider
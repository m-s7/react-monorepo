import React, { useContext, useEffect, useState } from 'react'
import config from 'Guide/configs/app'
import GuideWebsocketClient from 'Guide/business/websocket-client'
import { setClient } from 'Guide/store/reducers/websocket-reducer'
import { WebsocketClient } from '@ms7/websocket-client'
import { AuthProviderContext } from '@ms7/auth-providers'
import { useAppDispatch } from 'Guide/hooks/use-app-dispatch'
import { FullPageLoader } from '@ms7/bui'
import { WebsocketProviderComponentProps } from '@ms7/websocket-client'
import { env } from '@ms7/common'

const GuideWebsocketProvider = (props: WebsocketProviderComponentProps) => {
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

            if(!url) throw new Error(`Invalid url, ${url}`)

            const token = authContext?.getToken()
            const callback = (isConnected: boolean): void => { setIsConnected(isConnected) }

            websocketClient = new GuideWebsocketClient(callback, token, name, url, headers)
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
        return (
            <FullPageLoader
                header={env.REACT_APP_NAME}
                navigateName={'Index'}
                navigatePath={'/'} />
        )

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default GuideWebsocketProvider
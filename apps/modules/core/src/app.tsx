import React, { useContext, useEffect, useLayoutEffect } from 'react'
import AppRouter from 'Core/app-router'
import { env } from '@ms7/common'
import { useAppDispatch } from 'Core/hooks/use-app-dispatch'
import { reset as resetPersonReducer } from 'Core/store/reducers/person-reducer'
import { reset as resetCounterReducer } from 'Core/store/reducers/counter-reducer'
import CoreWebsocketProvider from 'Core/providers/core-websocket-provider'
import { WebsocketProvider } from '@ms7/websocket'
import { AuthProviderContext, setToken } from '@ms7/auth'
import { EntrypointComponentProps } from '@ms7/router'

const App = (props: EntrypointComponentProps) => {
    const dispatch = useAppDispatch()
    const authContext = useContext(AuthProviderContext)

    if(env.REACT_APP_CORE_WEBSOCKET_URL === undefined) throw new Error('Invalid WS url')
    if(env.REACT_APP_CORE_API_URL === undefined) throw new Error('Invalid API url')

    useLayoutEffect(() => {
        if(authContext) dispatch(setToken(authContext.getToken()))
    }, [])

    useEffect(() => () => {
        dispatch(resetPersonReducer())
        dispatch(resetCounterReducer())
    }, [])

    return (
        <WebsocketProvider provider={CoreWebsocketProvider}>
            <AppRouter parentLayout={props.parentLayout} />
        </WebsocketProvider>
    )
}

export default App
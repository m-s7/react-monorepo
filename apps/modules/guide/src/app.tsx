import React, { useContext, useEffect, useLayoutEffect } from 'react'
import AppRouter from 'Guide/app-router'
import { env } from '@ms7/common'
import { useAppDispatch } from 'Guide/hooks/use-app-dispatch'
import { reset as resetPersonReducer } from 'Guide/store/reducers/person-reducer'
import { reset as resetCounterReducer } from 'Guide/store/reducers/counter-reducer'
import { reset as resetWebsocketReducer } from 'Guide/store/reducers/websocket-reducer'
import { Provider as WebsocketProvider } from '@ms7/websocket-client'
import GuideWebsocketProvider from 'Guide/components/providers/guide-websocket-provider'
import { AuthProviderContext, setToken } from '@ms7/auth-providers'
import { EntrypointComponentProps } from '@ms7/router'
import ApiService, { AxiosError } from '@ms7/restful-redux'

const App = (props: EntrypointComponentProps) => {
    const dispatch = useAppDispatch()
    const context = useContext(AuthProviderContext)

    if(env.REACT_APP_GUIDE_WEBSOCKET_URL === undefined) throw new Error('Invalid WS url')
    if(env.REACT_APP_GUIDE_API_URL === undefined) throw new Error('Invalid API url')

    useLayoutEffect(() => {
        const token = context?.getToken()
        const logout = context?.logout
        if(token) {
            dispatch(setToken(token))

            if(logout)
                ApiService.setupApiServiceInterceptors(token, logout)
        }
        
    }, [])
    
    useEffect(() => () => {
        dispatch(resetPersonReducer())
        dispatch(resetCounterReducer())
        dispatch(resetWebsocketReducer())
    }, [])

    return (
        <WebsocketProvider provider={GuideWebsocketProvider}>
            <AppRouter parentLayout={props.parentLayout} />
        </WebsocketProvider>
    )
}

export default App
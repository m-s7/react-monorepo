import React, { useEffect } from 'react'
import AppRouter from 'Dummy/app-router'
import { useAppDispatch } from '@/hooks/use-app-dispatch'
import { reset as resetPersonReducer } from 'Dummy/store/reducers/person-reducer'
import { reset as resetCounterReducer } from 'Dummy/store/reducers/counter-reducer'
import { reset as resetWebsocketReducer } from 'Dummy/store/reducers/websocket-reducer'
import WebsocketProvider from '@/lib/websocket/provider'
import DummyWebsocketProvider from 'Dummy/components/providers/dummy-websocket-provider'
import EventBus from '@ms7/event-bus'

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        EventBus.register('dummy-ws-message')
    }, [])
    
    useEffect(() => () => {
        EventBus.unregister('dummy-ws-message')
        dispatch(resetPersonReducer())
        dispatch(resetCounterReducer())
        dispatch(resetWebsocketReducer())
    }, [])

    return (
        <WebsocketProvider provider={DummyWebsocketProvider}>
            <AppRouter />
        </WebsocketProvider>
    )
}

export default App
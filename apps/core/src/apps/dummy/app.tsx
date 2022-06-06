import React, { ElementType, useEffect } from 'react'
import AppRouter from 'Dummy/app-router'
import { useAppDispatch } from 'Dummy/hooks/use-app-dispatch'
import { reset as resetPersonReducer } from 'Dummy/store/reducers/person-reducer'
import { reset as resetCounterReducer } from 'Dummy/store/reducers/counter-reducer'
import { reset as resetWebsocketReducer } from 'Dummy/store/reducers/websocket-reducer'
import { Provider as WebsocketProvider } from '@ms7/websocket-client'
import DummyWebsocketProvider from 'Dummy/components/providers/dummy-websocket-provider'
import EventBus from '@ms7/event-bus'

interface Props {
    parentLayout?: React.ElementType,
}

const App = (props: Props) => {
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
            <AppRouter {...props} />
        </WebsocketProvider>
    )
}

export default App
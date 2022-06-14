import React, { useEffect } from 'react'
import AppRouter from 'Guide/app-router'
import { useAppDispatch } from 'Guide/hooks/use-app-dispatch'
import { reset as resetPersonReducer } from 'Guide/store/reducers/person-reducer'
import { reset as resetCounterReducer } from 'Guide/store/reducers/counter-reducer'
import { reset as resetWebsocketReducer } from 'Guide/store/reducers/websocket-reducer'
import { Provider as WebsocketProvider } from '@ms7/websocket-client'
import GuideWebsocketProvider from 'Guide/components/providers/guide-websocket-provider'
import EventBus from '@ms7/event-bus'

interface Props {
    parentLayout?: React.ElementType,
}

const App = (props: Props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        EventBus.register('guide-ws-message')
    }, [])
    
    useEffect(() => () => {
        EventBus.unregister('guide-ws-message')
        dispatch(resetPersonReducer())
        dispatch(resetCounterReducer())
        dispatch(resetWebsocketReducer())
    }, [])

    return (
        <WebsocketProvider provider={GuideWebsocketProvider}>
            <AppRouter {...props} />
        </WebsocketProvider>
    )
}

export default App
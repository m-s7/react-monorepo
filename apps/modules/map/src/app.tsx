import React, { useContext, useLayoutEffect } from 'react'
import AppRouter from 'Map/app-router'
import { AuthProviderContext, setToken } from '@ms7/auth-providers'
import EventBus from '@ms7/event-bus'
import { useAppDispatch } from 'Map/hooks/use-app-dispatch'
import { EntrypointComponentProps } from '@ms7/router'

const App = (props: EntrypointComponentProps) => {
    const context = useContext(AuthProviderContext)
    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        EventBus.register('guide-ws-message')

        const token = context?.getToken()
        if(token) dispatch(setToken('dupa'))
    }, [])

    return (<AppRouter {...props} />)
}


export default App
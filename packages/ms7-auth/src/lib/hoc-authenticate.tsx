import React, { useContext, useEffect } from 'react'
import { AuthProviderContext } from './auth-provider'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const withAuth = <T extends Props = Props>(WrappedComponent: React.ComponentType<T>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

    const componentWithAuth = (props: Omit<T, keyof Props>) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const authContext = useContext(AuthProviderContext)

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if(authContext) authContext.validate()
        }, [])

        return (<WrappedComponent {...(props as T)} />)
    }

    componentWithAuth.displayName = `withAuth(${displayName})`

    return componentWithAuth
}

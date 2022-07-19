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
            authenticate().then()
        }, [])

        const authenticate = async () => {
            if(authContext) {
                await authContext.validate()

                //TODO: refactor (don't logout here, instead return roles false is user is not authenticated)

                // if(!authContext.isAuthenticated())
                //     authContext.logout().then()
            }
        }

        return (<WrappedComponent {...(props as T)} />)
    }

    componentWithAuth.displayName = `withAuth(${displayName})`

    return componentWithAuth
}

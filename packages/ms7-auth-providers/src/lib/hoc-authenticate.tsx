import React, { useContext, useEffect } from 'react'
import { AuthProviderContext } from './auth-provider'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const withAuth = <T extends Props = Props>(WrappedComponent: React.ComponentType<T>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

    const componentWithAuth = (props: Omit<T, keyof Props>) => {
        const authContext = useContext(AuthProviderContext)

        useEffect(() => {
            authenticate().then()
        }, [])

        const authenticate = async () => {
            if(authContext) {
                await authContext.validate()

                if(!authContext.isAuthenticated()) {
                    window.location.replace(authContext.getLogoutUrl())
                }
            }
        }

        return (<WrappedComponent {...(props as T)} />)
    }

    componentWithAuth.displayName = `withAuth(${displayName})`

    return componentWithAuth
}

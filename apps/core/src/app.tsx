import React, { useEffect, useState } from 'react'
import CriticalError from '@/components/critical-error'
import FullPageLoader from '@/components/full-page-loader'
import FatalError from '@/business/models/errors/fatal-error'
import { logging } from '@ms7/logger'
import { getFlatRoutes, getRoutes } from '@ms7/router'
import AppRouter from '@/app-router'
import { AuthProvider, KeycloakAuthProvider, KeycloakAuthProviderProps } from '@ms7/auth-providers'
import ApiService from '@ms7/restful-redux'
import EventBus from '@ms7/event-bus'
import env from '@/env'
import { getAppRouters } from '@/utils/app-utils'

const App = () => {
    const logger = logging.getLogger('core')

    const [error, setError] = useState<Error>()
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        EventBus.register('test-channel')
        EventBus.subscribe('test-channel', x => {
            console.log('MSG REC APP', x)
        })

        initialize().then()
    }, [])

    useEffect(() => () => {
        EventBus.unsubscribe('test-channel')
        EventBus.unregister('test-channel')
    }, [])

    const initialize = async () => {
        if(!validateRouter()) return

        setIsInitialized(true)
    }

    const validateRouter = () => {
        const routes = getFlatRoutes(getRoutes(getAppRouters()))
        for(const route of routes) {
            const { path, index, children } = route
            const message = 'Invalid router configuration'
            if(children) {
                if(!path) {
                    setError(new FatalError('Router', message))
                    logger.error(`${message}, missing path on parent node`, route)

                    return false
                }

                if(index) {
                    setError(new FatalError('Router', message))
                    logger.error(`${message}, index on parent node`, route)

                    return false
                }

                const indexChildren = children.filter(child => child.index)
                if(indexChildren.length > 1) {
                    setError(new FatalError('Router', message))
                    logger.error(`${message}, parent child node may contain only one index element`, route)

                    return false
                }

                // const childWithDiffRoles = children.find(child => (child.roles || [Role.GUEST]).every(r => !(roles || [Role.GUEST]).includes(r)))
                // if(childWithDiffRoles) {
                //     console.log(childWithDiffRoles)
                //     const parentWeight = (route.roles || [Role.GUEST]).reduce((a, b) => a + b, 0)
                //     const childWeight = childWithDiffRoles.roles?.reduce((a, b) => a + b, 0) || 0
                //     console.log(parentWeight, childWeight)
                //     if(parentWeight < childWeight) {
                //         setError(new FatalError('Router', message))
                //         logger.error(`${message}, child node cannot have lower access rights than parent`, route)
                //
                //         return false
                //     }
                // }
            }

            if(path && index) {
                setError(new FatalError('Router', message))
                logger.error(`${message}, path and index on single node`, route)

                return false
            }

            if(!path && !index) {
                setError(new FatalError('Router', message))
                logger.error(`${message}, node must contain parent or index`, route)

                return false
            }
        }

        return true
    }

    if(!isInitialized) {
        if(error) return (<CriticalError error={error} />)
        else return (<FullPageLoader />)
    }

    return (
        // <AuthProvider<KeycloakAuthProviderProps>
        //     provider={KeycloakAuthProvider}
        //     providerProps={{
        //         config: { url: env.REACT_APP_KEYCLOAK_URL, realm: env.REACT_APP_KEYCLOAK_REALM, clientId: env.REACT_APP_KEYCLOAK_CLIENTID },
        //         errorComponent: CriticalError,
        //         suspenseComponent: FullPageLoader,
        //         onAuthenticatedHandler: (token: string, logoutMethod: () => void) => {
        //             ApiService.setupApiServiceInterceptors(token, logoutMethod)
        //         },
        //     }}>
            <AppRouter />
        // </AuthProvider>
    )
}

export default App

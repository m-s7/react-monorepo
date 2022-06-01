import React, { useEffect, useState } from 'react'
import CriticalError from '@/components/critical-error'
import { getAppsConfigs } from '@/utils/apps-utils'
import FullPageLoader from '@/components/full-page-loader'
import FatalError from '@/business/models/errors/fatal-error'
import ConfigManager from '@/business/config-manager'
import { logging } from '@/business/log-manager'
import { AppConfig } from '@/business/models/app'
import { LogOptions } from '@/business/models/logger'
import { getFlatRoutes, getRoutes } from '@/utils/router-utils'
import AppRouter from '@/app-router'
import AuthProvider from '@/components/providers/auth-provider'
import KeycloakAuthProvider from '@/components/providers/auth/keycloak-auth-provider'
import EventBus from '@/lib/event-bus'

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
        if(!await loadConfiguration()) return

        const appsConfigs = loadAppsConfigs()
        if(!appsConfigs) return

        if(!validateRouter()) return

        initializeLogger(appsConfigs)

        setIsInitialized(true)
    }

    const loadConfiguration = async (): Promise<boolean> =>
        await new ConfigManager().loadConfig()
            .then(config => {
                logger.debug('Configuration file loaded', config)

                return true
            })
            .catch(error => {
                const message = 'Unable to load configuration file'
                setError(new FatalError('Config', message))
                logger.debug(message, error)

                return false
            })
    const loadAppsConfigs = (): AppConfig[] | undefined => {
        try {
            const appsConfigs = getAppsConfigs()

            logger.debug('Apps configuration loaded', appsConfigs)

            return appsConfigs
        }
        catch(error) {
            const message = 'Unable to load apps configuration files'
            setError(new FatalError('Config', message))
            logger.debug(message, error)
        }
    }
    const validateRouter = () => {
        const routes = getFlatRoutes(getRoutes())
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
    const initializeLogger = (appsConfigs: AppConfig[]) => {
        const loggerMinLevels: LogOptions = { minLevels: {}}
        appsConfigs.forEach(appConfig => loggerMinLevels.minLevels[appConfig.log.name] = appConfig.log.min)
        logging.addConfigurationOption(loggerMinLevels)
    }

    if(!isInitialized) {
        if(error) return (<CriticalError error={error} />)
        else return (<FullPageLoader />)
    }

    return (
        <AuthProvider provider={KeycloakAuthProvider}>
            <AppRouter />
        </AuthProvider>
    )
}

export default App

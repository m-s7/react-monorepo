import { AppConfig } from '@/business/models/app'
import { getConfigFiles, requireApp } from '@/utils/webpack-utils'
import { getConfigValue } from '@/business/config-manager'
import { ReducerDictionary } from '@/business/models/common'
import { RouteEntrypointConfig } from '@/business/models/router'

export const getAppsConfigs = (): AppConfig[] => {
    const apps: AppConfig[] = []
    for(const appConfigPath of getAppsConfigPaths()) {
        const config = getAppConfig(appConfigPath)
        if(config) {
            const isActive: boolean = (getConfigValue(config.key, config.active) === 'true')

            if(isActive) apps.push((config as AppConfig))
        }
    }

    return apps
}

export const getAppsReducers = (): ReducerDictionary => {
    let reducers: ReducerDictionary = {}

    getAppsConfigPaths().forEach(appConfigPath => {
        const config = getAppConfig(appConfigPath)
        const appReducers = config?.store?.reducers
        if(appReducers) reducers = { ...reducers, ...appReducers }
    })

    return reducers
}

export const getAppsEntrypoints = (): RouteEntrypointConfig[] => {
    const entrypoints: RouteEntrypointConfig[] = []

    getAppsConfigPaths().forEach(appConfigPath => {
        const config = getAppConfig(appConfigPath)
        const entrypoint = config?.router.entrypoint
        if(entrypoint)
            entrypoints.push(entrypoint)
    })

    return entrypoints
}

const getAppsConfigPaths = (): string[] => {
    const foundApps = getConfigFiles()
    if(!foundApps) return []

    return (typeof foundApps === 'function' ? (foundApps as __WebpackModuleApi.RequireContext).keys() : Object.keys(foundApps))
}

const getAppConfig = (path: string): AppConfig | undefined => {
    const app = requireApp(path.replace('./', ''))

    if(app?.default) return app.default()
}

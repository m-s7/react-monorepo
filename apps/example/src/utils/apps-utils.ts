import { AppConfig } from '@ms7/common'
import { EntrypointConfig, RouterEntrypoint } from '@ms7/router'
import mapConfig from 'Map/configs/app'
import mapEntrypointConfig from 'Map/configs/entrypoint'
import coreConfig from 'Core/configs/app'
import coreEntrypointConfig from 'Core/configs/entrypoint'
import { MenuConfig } from '@ms7/common'
import { getConfigRouter } from '@/configs/app'

export const getAppRouters = (): RouterEntrypoint[] => [{ router: getConfigRouter() }, ...getAppsRouterEntrypointConfigs()]

const getAppsConfigs = (): AppConfig[] => [coreConfig, mapConfig].filter(config => config.active)
export const getAppsMenusConfigs = (): MenuConfig[][] => getAppsConfigs().map(({ menu }) => menu)
export const getAppsEntrypointsConfigs = (): EntrypointConfig[] => [mapEntrypointConfig, coreEntrypointConfig]
export const getAppsRouterEntrypointConfigs = (): RouterEntrypoint[] => [
    { router: mapConfig.router, entrypoint: mapEntrypointConfig },
    { router: coreConfig.router, entrypoint: coreEntrypointConfig },
]

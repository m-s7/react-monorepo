import { AppConfig } from '@ms7/common'
import { EntrypointConfig, RouterEntrypoint } from '@ms7/router'
import mapConfig from 'Map/configs/app'
import mapEntrypointConfig from 'Map/configs/entrypoint'
import guideConfig from 'Guide/configs/app'
import guideEntrypointConfig from 'Guide/configs/entrypoint'
import { MenuConfig } from '@ms7/common'
import { getConfigRouter } from '@/configs/app'

export const getAppRouters = (): RouterEntrypoint[] => [{ router: getConfigRouter() }, ...getAppsRouterEntrypointConfigs()]

const getAppsConfigs = (): AppConfig[] => [guideConfig, mapConfig].filter(config => config.active)
export const getAppsMenusConfigs = (): MenuConfig[][] => getAppsConfigs().map(({ menu }) => menu)
export const getAppsEntrypointsConfigs = (): EntrypointConfig[] => [mapEntrypointConfig, guideEntrypointConfig]
export const getAppsRouterEntrypointConfigs = (): RouterEntrypoint[] => [
    { router: mapConfig.router, entrypoint: mapEntrypointConfig },
    { router: guideConfig.router, entrypoint: guideEntrypointConfig },
]

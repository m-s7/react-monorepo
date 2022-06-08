import { AppConfig } from '@ms7/common'
import { EntrypointConfig, RouterConfig, RouterEntrypoint } from '@ms7/router'
import mapConfig from 'Map/configs/app'
import mapEntrypointConfig from 'Map/configs/entrypoint'
import dummyConfig from '../../../modules/dummy/src/configs/app'
// import dummyConfig from 'Dummy/configs/app'
import dummyEntrypointConfig from '../../../modules/dummy/src/configs/entrypoint'
// import dummyEntrypointConfig from 'Dummy/configs/entrypoint'
import { MenuConfig } from '@ms7/common'

const getAppsConfigs = (): AppConfig[] => [dummyConfig, mapConfig].filter(config => config.active)
export const getAppsMenusConfigs = (): MenuConfig[][] => getAppsConfigs().map(({ menu }) => menu)
export const getAppsRoutersConfigs = (): RouterConfig[] => getAppsConfigs().map(({ router }) => router)
export const getAppsEntrypointsConfigs = (): EntrypointConfig[] => [mapEntrypointConfig, dummyEntrypointConfig]
export const getAppsRouterEntrypointConfigs = (): RouterEntrypoint[] => [
    { router: mapConfig.router, entrypoint: mapEntrypointConfig },
    { router: dummyConfig.router, entrypoint: dummyEntrypointConfig },
]
// getAppsRoutersConfigs()
//     .filter(({ entrypoint }) => entrypoint !== undefined)
//     .map(({ entrypoint }) => (entrypoint as Necessary<RouteEntrypointConfig, 'baseUrl' | 'component'>))

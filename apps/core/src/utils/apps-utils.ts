import { AppConfig } from '@ms7/common'
import { Necessary } from '@ms7/common'
import { RouteEntrypointConfig, RouterConfig } from '@ms7/router'
import mapConfig from 'Map/configs/app'
import dummyConfig from 'Dummy/configs/app'
import { MenuConfig } from '@ms7/common'

const getAppsConfigs = (): AppConfig[] => [dummyConfig, mapConfig].filter(config => config.active)
export const getAppsMenusConfigs = (): MenuConfig[][] => getAppsConfigs().map(({ menu }) => menu)
export const getAppsRoutersConfigs = (): RouterConfig[] => getAppsConfigs().map(({ router }) => router)
export const getAppsEntrypointsConfigs = (): RouteEntrypointConfig[] =>
    getAppsRoutersConfigs()
        .filter(({ entrypoint }) => entrypoint !== undefined)
        .map(({ entrypoint }) => (entrypoint as Necessary<RouteEntrypointConfig, 'baseUrl' | 'component'>))

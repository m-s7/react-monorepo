import { AppConfig } from '@/business/models/app'
import { Necessary } from '@/business/models/common'
import { RouteEntrypointConfig, RouterConfig } from '@/business/models/router'
import mapConfig from 'Map/configs/app'
import dummyConfig from 'Dummy/configs/app'
import { MenuConfig } from '@/business/models/menu'

const getAppsConfigs = (): AppConfig[] => [dummyConfig(), mapConfig()]
export const getAppsMenusConfigs = (): MenuConfig[][] => getAppsConfigs().map(({ menu }) => menu)
export const getAppsRoutersConfigs = (): RouterConfig[] => getAppsConfigs().map(({ router }) => router)
export const getAppsEntrypointsConfigs = (): RouteEntrypointConfig[] =>
    getAppsRoutersConfigs()
        .filter(({ entrypoint }) => entrypoint !== undefined)
        .map(({ entrypoint }) => (entrypoint as Necessary<RouteEntrypointConfig, 'baseUrl' | 'component'>))

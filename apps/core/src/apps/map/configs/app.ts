import getMenuConfig from 'Map/configs/menu'
import getRouterConfig from 'Map/configs/router'
import getWebsocketConfig from 'Map/configs/websocket'
import { AppConfig } from '@/business/models/app'
import { getLogLevelForEnv } from '@/utils/logger-utils'
import { RouterConfig } from '@/business/models/router'

const getConfig = (): AppConfig => ({
    key: 'map',
    active: 'active',
    title: 'Map',
    url: 'url',
    log: {
        name: 'map',
        min: getLogLevelForEnv(),
    },
    menu: getMenuConfig(),
    router: getRouterConfig(),
    websocket: getWebsocketConfig(),
})

export const getConfigRouter = (): RouterConfig => getRouterConfig()

export default getConfig
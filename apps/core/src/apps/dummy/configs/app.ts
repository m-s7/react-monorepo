import getStoreConfig from 'Dummy/configs/store'
import getMenuConfig from 'Dummy/configs/menu'
import getRouterConfig from 'Dummy/configs/router'
import getWebsocketConfig from 'Dummy/configs/websocket'
import { AppConfig, StoreConfig } from '@/business/models/app'
import { getLogLevelForEnv } from '@/utils/logger-utils'
import { RouterConfig } from '@/business/models/router'
import env from '@/env'

const getConfig = (): AppConfig => ({
    key: 'dummy',
    active: env.REACT_APP_DUMMY,
    title: 'Dummy',
    apiUrl: env.REACT_APP_DUMMY_API_URL,
    log: {
        name: 'dummy',
        min: getLogLevelForEnv(),
    },
    store: getStoreConfig(),
    menu: getMenuConfig(),
    router: getRouterConfig(),
    websocket: getWebsocketConfig(),
})

export const getConfigStore = (): StoreConfig => getStoreConfig()
export const getConfigRouter = (): RouterConfig => getRouterConfig()

export default getConfig
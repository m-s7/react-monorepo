import storeConfig from 'Dummy/configs/store'
import menuConfig from 'Dummy/configs/menu'
import routerConfig from 'Dummy/configs/router'
import websocketConfig from 'Dummy/configs/websocket'
import { AppConfig, StoreConfig } from '@/business/models/app'
import { getLogLevelForEnv } from '@ms7/logger'
import { RouterConfig } from '@/business/models/router'
import env from '@/env'
import { isDev } from '@/utils/app-utils'

const config: AppConfig = {
    key: 'dummy',
    active: (env.REACT_APP_DUMMY === 'true'),
    title: 'Dummy',
    apiUrl: env.REACT_APP_DUMMY_API_URL,
    log: {
        name: 'dummy',
        min: getLogLevelForEnv(isDev()),
    },
    store: storeConfig,
    menu: menuConfig,
    router: routerConfig,
    websocket: websocketConfig,
}

export const getConfigStore = (): StoreConfig => storeConfig
export const getConfigRouter = (): RouterConfig => routerConfig

export default config
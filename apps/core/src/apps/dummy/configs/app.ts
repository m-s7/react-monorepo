import menuConfig from 'Dummy/configs/menu'
import routerConfig from 'Dummy/configs/router'
import websocketConfig from 'Dummy/configs/websocket'
import { AppConfig } from '@/business/models/app'
import { getLogLevelForEnv } from '@ms7/logger'
import { RouterConfig } from '@ms7/router'
import env from '@/env'

const config: AppConfig = {
    key: 'dummy',
    active: (env.REACT_APP_DUMMY === 'true'),
    title: 'Dummy',
    apiUrl: env.REACT_APP_DUMMY_API_URL,
    log: {
        name: 'dummy',
        min: getLogLevelForEnv((process.env.NODE_ENV === 'development')),
    },
    menu: menuConfig,
    router: routerConfig,
    websocket: websocketConfig,
}

export const getConfigRouter = (): RouterConfig => routerConfig

export default config
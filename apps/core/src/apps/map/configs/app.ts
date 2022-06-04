import menuConfig from 'Map/configs/menu'
import routerConfig from 'Map/configs/router'
import websocketConfig from 'Map/configs/websocket'
import { AppConfig } from '@/business/models/app'
import { getLogLevelForEnv } from '@ms7/logger'
import { RouterConfig } from '@/business/models/router'
import env from '@/env'
import { isDev } from '@/utils/app-utils'

const config: AppConfig = {
    key: 'map',
    active: (env.REACT_APP_MAP === 'true'),
    title: 'Map',
    apiUrl: env.REACT_APP_MAP_API_URL,
    log: {
        name: 'map',
        min: getLogLevelForEnv(isDev()),
    },
    menu: menuConfig,
    router: routerConfig,
    websocket: websocketConfig,
}

export const getConfigRouter = (): RouterConfig => routerConfig

export default config
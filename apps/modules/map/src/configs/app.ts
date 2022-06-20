import menuConfig from 'Map/configs/menu'
import routerConfig from 'Map/configs/router'
import websocketConfig from 'Map/configs/websocket'
import { env } from '@ms7/common'
import { AppConfig, isDev } from '@ms7/common'
import { getLogLevelForEnv } from '@ms7/logger'
import { RouterConfig } from '@ms7/router'

const config: AppConfig = {
    key: 'map',
    active: (env.REACT_APP_MAP === 'true'),
    title: 'Map',
    apiUrl: env.REACT_APP_MAP_API_URL,
    menu: menuConfig,
    router: routerConfig,
    websocket: websocketConfig,
}

export const getConfigRouter = (): RouterConfig => routerConfig

export default config
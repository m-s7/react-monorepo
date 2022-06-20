import menuConfig from 'Guide/configs/menu'
import routerConfig from 'Guide/configs/router'
import websocketConfig from 'Guide/configs/websocket'
import { env } from '@ms7/common'
import { AppConfig, isDev } from '@ms7/common'
import { getLogLevelForEnv } from '@ms7/logger'
import { RouterConfig } from '@ms7/router'

const config: AppConfig = {
    key: 'guide',
    active: (env.REACT_APP_GUIDE === 'true'),
    title: 'Guide',
    apiUrl: env.REACT_APP_GUIDE_API_URL,
    menu: menuConfig,
    router: routerConfig,
    websocket: websocketConfig,
}

export const getConfigRouter = (): RouterConfig => routerConfig

export default config
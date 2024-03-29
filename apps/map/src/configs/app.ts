import menuConfig from 'Map/configs/menu'
import routerConfig from 'Map/configs/router'
import { env } from '@ms7/common'
import { AppConfig } from '@ms7/common'
import { RouterConfig } from '@ms7/router'

const config: AppConfig = {
    key: 'map',
    active: (env.REACT_APP_MAP === 'true'),
    title: 'Map',
    apiUrl: env.REACT_APP_MAP_API_URL,
    menu: menuConfig,
    router: routerConfig,
}

export const getConfigRouter = (): RouterConfig => routerConfig

export default config
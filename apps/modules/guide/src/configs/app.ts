import menuConfig from 'Guide/configs/menu'
import routerConfig from 'Guide/configs/router'
import { env } from '@ms7/common'
import { AppConfig } from '@ms7/common'
import { RouterConfig } from '@ms7/router'

const config: AppConfig = {
    key: 'guide',
    active: (env.REACT_APP_GUIDE === 'true'),
    title: 'Guide',
    apiUrl: env.REACT_APP_GUIDE_API_URL,
    menu: menuConfig,
    router: routerConfig,
}

export const getConfigRouter = (): RouterConfig => routerConfig

export default config
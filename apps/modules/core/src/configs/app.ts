import menuConfig from 'Core/configs/menu'
import routerConfig from 'Core/configs/router'
import { env } from '@ms7/common'
import { AppConfig } from '@ms7/common'
import { RouterConfig } from '@ms7/router'

const config: AppConfig = {
    key: 'core',
    active: (env.REACT_APP_CORE === 'true'),
    title: 'Core',
    apiUrl: env.REACT_APP_CORE_API_URL,
    menu: menuConfig,
    router: routerConfig,
}

export const getConfigRouter = (): RouterConfig => routerConfig

export default config
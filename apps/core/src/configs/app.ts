import menuConfig from '@/configs/menu'
import routerConfig from '@/configs/router'
import { AppConfig } from '@/business/models/app'
import { Optional } from '@/business/models/common'

const config: Optional<AppConfig, 'key' | 'active' | 'title' | 'apiUrl' | 'log'> = {
    menu: menuConfig,
    router: routerConfig,
}

export const getConfigMenu = () => menuConfig
export const getConfigRouter = () => routerConfig

export default config
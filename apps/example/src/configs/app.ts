import menuConfig from '@/configs/menu'
import routerConfig from '@/configs/router'
import { AppConfig } from '@ms7/common'
import { Optional } from '@ms7/common'

const config: Optional<AppConfig, 'key' | 'active' | 'title' | 'apiUrl'> = {
    menu: menuConfig,
    router: routerConfig,
}

export const getConfigMenu = () => menuConfig
export const getConfigRouter = () => routerConfig

export default config
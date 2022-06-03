import getMenuConfig from '@/configs/menu'
import getRouterConfig from '@/configs/router'
import { AppConfig } from '@/business/models/app'
import { Optional } from '@/business/models/common'

const getConfig = (): Optional<AppConfig, 'key' | 'active' | 'title' | 'apiUrl' | 'log'> => ({
    menu: getMenuConfig(),
    router: getRouterConfig(),
})

export const getConfigMenu = () => getMenuConfig()
export const getConfigRouter = () => getRouterConfig()

export default getConfig
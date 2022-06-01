import getStoreConfig from '@/configs/store'
import getMenuConfig from '@/configs/menu'
import getRouterConfig from '@/configs/router'
import { AppConfig } from '@/business/models/app'
import { Necessary, Optional } from '@/business/models/common'

const getConfig = (): Necessary<Optional<AppConfig, 'key' | 'active' | 'title' | 'url' | 'log'>, 'store'> => ({
    store: { reducers: getStoreConfig() },
    menu: getMenuConfig(),
    router: getRouterConfig(),
})

export const getConfigMenu = () => getMenuConfig()
export const getConfigRouter = () => getRouterConfig()

export default getConfig
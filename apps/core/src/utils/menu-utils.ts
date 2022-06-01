import { MenuConfig } from '@/business/models/menu'
import { getConfigMenu } from '@/configs/app'
import { Location, matchPath } from 'react-router-dom'
import { getAppsConfigs } from '@/utils/apps-utils'

export const getMenu = () => {
    const menu: MenuConfig[] = [...getConfigMenu()]
    const appsConfigs = getAppsConfigs()

    appsConfigs.forEach(moduleConfig => {
        menu.push(...moduleConfig.menu)
    })

    return menu
}

export const getFlatMenu = (menu: MenuConfig[]): MenuConfig[] => {
    const flatRoutes: MenuConfig[] = []

    menu.forEach(node => {
        const { children, ...rest } = node

        if(children)
            flatRoutes.push(...getFlatMenu(children))
        else
            flatRoutes.push({ ...rest })
    })

    return flatRoutes
}

export const getActiveMenuNode = (menu: MenuConfig[], location: Location): string | undefined => {
    for(const { path } of menu) {
        const matchedPath = matchPath({ path }, location.pathname)
        if(matchedPath) {
            const { path } = matchedPath.pattern

            return (path.includes('/:') ? path.substring(path.indexOf('/:'), 0) : path)
        }
    }
}

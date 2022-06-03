import { getConfigValue } from '@/business/config-manager'
import { AppConfig } from '@/business/models/app'
import { getConfigRouter } from '@/configs/app'
import { RouteConfig, RouterConfig } from '@/business/models/router'
import { getAppsRoutersConfigs } from '@/utils/apps-utils'

export const getBaseUrlForModule = (config: AppConfig): string => {
    const value = getConfigValue(config.key, config.url)

    return (value ?? '')
}

export const getPathnameFromUrl = (url: string): string => new URL(url).pathname

export const getRoutePathname = (pathname: string): string => {
    const [, module] = pathname.split('/')

    return (module || '')
}

export const normalizeUrl = (url: string): string => {
    while(url.endsWith('/')) url = url.substring(0, url.length - 1)
    if(!url.startsWith('/')) url = `/${url}`
    url = url.replaceAll('/*/', '/').replaceAll('/*', '/')

    return url
}

export const getRoutes = (includeAppsRoutes = true): RouteConfig[] => {
    const routes: RouteConfig[] = [...getConfigRouter().routes]
    const appsRoutersConfigs: RouterConfig[] = (includeAppsRoutes ? getAppsRoutersConfigs() : [])

    appsRoutersConfigs.forEach(( { routes, entrypoint }) => {
        let relativeRoutes: RouteConfig[] = []
        if(entrypoint) {
            relativeRoutes = getRoutesWithRelativePaths(routes, entrypoint.baseUrl)
            routes.push(...relativeRoutes)
        }
        else
            routes.push(...routes)

    })

    return routes
}

export const getFlatRoutes = (routes: RouteConfig[], relativePaths?: boolean, parentPath?: string): RouteConfig[] => {
    const flatRoutes: RouteConfig[] = []

    routes.forEach(route => {
        const { children, path, ...rest } = route

        if(children) {
            flatRoutes.push(...getFlatRoutes(children, relativePaths, route.path))
            flatRoutes.push({ ...rest, path, children })
        }
        else if(path) {
            if(relativePaths)
                flatRoutes.push({ ...rest, path: normalizeUrl((parentPath ? joinPaths([parentPath, path]) : path)) })
            else
                flatRoutes.push({ ...rest, path })
        }
    })

    return flatRoutes
}

export const getRouterConsoleMap = (routes: RouteConfig[], index?: number) => {
    const tab = '  '

    let idx = index || 0
    let result = '\n'
    let prefix = ''

    for(let i = 0; i < idx; i++)
        prefix += tab

    routes.forEach(({ path, title, children }) => {
        if(children) {
            const currentPrefix = prefix

            result += (`${prefix}<Route> ${path} [${title}]`)

            idx++
            prefix += tab

            result += getRouterConsoleMap(children, idx)
            result += (`${currentPrefix}</Route>\n`)

            idx = 0
            prefix = ''
        }
        else {
            result += (`${prefix}<Route> ${(path || 'index')} [${title}] </Route>\n`)
        }
    })

    return result
}

const joinPaths = (paths: string[]): string => paths.join('/').replace(/\/\/+/g, '/')

const getRoutesWithRelativePaths = (routes: RouteConfig[], parentPath: string): RouteConfig[] => {
    const routesClone = [...routes]
    const relativeRoutes: RouteConfig[] = []

    routesClone.forEach(route => {
        const mutableRoute = { ...route }
        const { path, children } = mutableRoute

        if(children)
            relativeRoutes.push(...getRoutesWithRelativePaths(children, parentPath))

        let relativePath = path
        if(path)
            relativePath = joinPaths([parentPath, path])

        if(relativePath)
            mutableRoute.path = relativePath

        relativeRoutes.push({ ...mutableRoute })
    })

    return relativeRoutes
}

import * as React from 'react'
import { matchPath, Params, PathPattern, RouteObject, useLocation } from 'react-router'

type Location = ReturnType<typeof useLocation>

interface Options {
    disableDefaults?: boolean,
    overrideDefaultHome?: string,
    stringReturn?: boolean,
}

interface BreadcrumbMatch<K extends string = string> {
    params: Params<K>,
    pathname: string,
    pattern: PathPattern,
    route?: BreadcrumbRoute,
}

interface BreadcrumbComponentProps<K extends string = string> {
    key: string,
    match: BreadcrumbMatch<K>,
    location: Location,
}

export interface BreadcrumbData<K extends string = string> {
    match: BreadcrumbMatch<K>,
    location: Location,
    key: string,
    breadcrumb: React.ReactNode | string,
}

export interface BreadcrumbRoute<K extends string = string> extends RouteObject {
    breadcrumb?: BreadcrumbComponentType<K> | string,
    props?: { [x: string]: unknown },
}

export type BreadcrumbComponentType<K extends string = string> = React.ComponentType<BreadcrumbComponentProps<K>>

const NO_BREADCRUMB = Symbol('NO_BREADCRUMB')

const useRouterBreadcrumbs = (routes?: BreadcrumbRoute[], options?: Options): BreadcrumbData[] => getBreadcrumbs(routes || [], useLocation(), options)

const getBreadcrumbs = (routes: BreadcrumbRoute[], location: Location, options?: Options): BreadcrumbData[] => {
    const { pathname } = location

    const branches = routes
    const breadcrumbs: BreadcrumbData[] = []
    pathname
        .split('/')
        .reduce((previousPathPart: string, currentPathPart: string, index: number) => {
            const path = !currentPathPart ? '/' : `${previousPathPart}/${currentPathPart}`

            if(path === '/' && index !== 0)
                return ''

            const breadcrumb = getBreadcrumbMatch(path, location, currentPathPart, branches, options)

            if(breadcrumb !== NO_BREADCRUMB)
                breadcrumbs.push(breadcrumb)

            return path === '/' ? '' : path
        }, '')

    return breadcrumbs
}

const getBreadcrumbMatch = (path: string, location: Location, pathName: string, branches: BreadcrumbRoute[], options?: Options): typeof NO_BREADCRUMB | BreadcrumbData => {
    let breadcrumb: BreadcrumbData | typeof NO_BREADCRUMB | undefined

    branches.some(route => {
        const { caseSensitive, props } = route
        const match = matchPath(
            {
                path: route.path || '',
                end: true,
                caseSensitive,
            },
            path,
        )

        if(match && !route.breadcrumb)
            return true

        if(match) {
            if(!route.breadcrumb && options?.disableDefaults) {
                breadcrumb = NO_BREADCRUMB

                return true
            }

            breadcrumb = render(route.breadcrumb || humanize(pathName), { ...match, route }, location, options?.stringReturn, props)

            return true
        }

        return false
    })

    if(breadcrumb)
        return breadcrumb

    if(options?.disableDefaults)
        return NO_BREADCRUMB

    return getDefaultBreadcrumb(path, location, (path === '/' ? (options?.overrideDefaultHome ?? 'Home') : pathName), options?.stringReturn)
}

const render = (breadcrumb: BreadcrumbComponentType | string, match: BreadcrumbMatch, location: Location, stringReturn?: boolean, props?: { [x: string]: unknown }): BreadcrumbData => {
    const componentProps = {
        match,
        location,
        key: match.pathname,
        ...(props || {}),
    }

    const Component = breadcrumb

    return {
        ...componentProps,
        breadcrumb:
            typeof breadcrumb === 'string' ? (stringReturn ? breadcrumb : (React.createElement('span', { key: componentProps.key }, breadcrumb))) : (<Component {...componentProps} />),
    }
}

const getDefaultBreadcrumb = (path: string, location: Location, pathName: string, stringReturn?: boolean): typeof NO_BREADCRUMB | BreadcrumbData => {
    const match = matchPath(
        {
            end: true,
            path,
        },
        path,
    )

    if(!match)
        return NO_BREADCRUMB

    return render(humanize(pathName), match, location, stringReturn)
}

const humanize = (str: string): string => str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[-_\s]+/g, ' ')
    .replace(/^[a-z]/, m => m.toUpperCase())

export default useRouterBreadcrumbs
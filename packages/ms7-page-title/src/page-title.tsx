import * as React from 'react'
import { matchPath, Params, PathPattern, RouteObject, useLocation } from 'react-router'

type Location = ReturnType<typeof useLocation>

interface Options {
    stringReturn?: boolean,
}

interface PageTitleMatch<K extends string = string> {
    params: Params<K>,
    pathname: string,
    pattern: PathPattern,
    route?: PageTitleRoute,
}

interface PageTitleMatch<K extends string = string> {
    params: Params<K>,
    pathname: string,
    pattern: PathPattern,
    route?: PageTitleRoute,
}

interface PageTitleComponentProps<K extends string = string> {
    match: PageTitleMatch<K>,
    location: Location,
}

export interface PageTitleData<K extends string = string> {
    match: PageTitleMatch<K>,
    location: Location,
    title: React.ReactNode | string,
}

export interface PageTitleRoute<K extends string = string> extends RouteObject {
    title?: PageTitleComponentType<K> | string,
    props?: { [x: string]: unknown },
}

export type PageTitleComponentType<K extends string = string> = React.FunctionComponent<PageTitleComponentProps<K>>

const useRouterPageTitle = (routes?: PageTitleRoute[], options?: Options) => getPageTitle(routes || [], useLocation(), options)

const getPageTitle = (routes: PageTitleRoute[], location: Location, options?: Options): PageTitleData | undefined => {
    for(const route of routes) {
        const { path, title, caseSensitive, props } = route
        const match = matchPath(
            {
                path: path || '',
                end: true,
                caseSensitive,
            },
            location.pathname,
        )

        if(match)
            return render(title || '', match, location, options?.stringReturn, props)
    }
}

const render = (title: PageTitleComponentType | string, match: PageTitleMatch, location: Location, stringReturn?: boolean, props?: { [x: string]: unknown }): PageTitleData => {
    const componentProps = {
        match,
        location,
        ...(props || {}),
    }
    
    const Component = title
    
    return {
        ...componentProps,
        title:
            typeof title === 'string' ? (stringReturn ? humanize(title) : (React.createElement('span', {}, title))) : (<Component {...componentProps} />),
    }
} 

const humanize = (str: string): string => str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[-_\s]+/g, ' ')
    .replace(/^[a-z]/, m => m.toUpperCase())

export default useRouterPageTitle
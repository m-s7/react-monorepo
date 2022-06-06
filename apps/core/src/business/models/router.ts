import React  from 'react'
import { Role } from '@ms7/auth-providers'
import { PageTitleComponentType } from '@ms7/page-title'
import { BreadcrumbComponentType } from '@ms7/breadcrumbs'

export interface RouterConfig {
    readonly entrypoint?: RouteEntrypointConfig,
    readonly routes: RouteConfig[],
}

export interface RouteConfig {
    path?: string,
    readonly index?: boolean,
    readonly roles?: Role[],
    readonly component: React.ElementType,
    readonly title?: PageTitleComponentType | string,
    readonly breadcrumb?: BreadcrumbComponentType | string,
    readonly layout?: React.ElementType,
    readonly children?: RouteConfig[],
}

export interface RouteEntrypointConfig {
    readonly baseUrl: string,
    readonly component: React.ComponentType<{ parentLayout: React.ElementType }>,
}

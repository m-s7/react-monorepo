import React  from 'react'
import { Role } from '@ms7/auth-providers'
import { PageTitleComponentType } from '@ms7/page-title'
import { BreadcrumbComponentType } from '@ms7/breadcrumbs'

export interface RouterConfig {
    entrypoint?: RouteEntrypointConfig,
    routes: RouteConfig[],
}

export interface RouteConfig {
    path?: string,
    index?: boolean,
    roles?: Role[],
    component: React.ElementType,
    title?: PageTitleComponentType | string,
    breadcrumb?: BreadcrumbComponentType | string,
    layout?: React.ElementType,
    children?: RouteConfig[],
}

export interface RouteEntrypointConfig {
    baseUrl: string,
    component: React.ComponentType<{ parentLayout: React.ElementType }>,
}

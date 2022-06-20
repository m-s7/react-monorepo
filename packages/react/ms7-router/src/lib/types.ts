import React from 'react'
import { Role } from '@ms7/auth-providers'
import { PageTitleComponentType } from '@ms7/page-title'
import { BreadcrumbComponentType } from '@ms7/breadcrumbs'

export interface RouterConfig {
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

export interface EntrypointConfig {
    baseUrl: string,
    component: React.ComponentType<EntrypointComponentProps>,
}

export interface EntrypointComponentProps {
    parentLayout?: React.ElementType,
}

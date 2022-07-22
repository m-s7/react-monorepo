import React from 'react'
import { Role } from '@ms7/auth'
import { PageTitleComponentType } from '@ms7/page-title'
import { BreadcrumbComponentType } from '@ms7/breadcrumbs'

export interface RouterConfig {
    routes: Array<Route>,
}

export type Route = RouteParentConfig | RouteConfig

export interface RouteParentConfig {
    component: React.ElementType,
    children: Array<Route>,
    path?: never,
    title?: never,
    roles?: never,
    layout?: never,
    breadcrumb?: never,
}

export interface RouteConfig {
    component: React.ElementType,
    path: string,
    title: PageTitleComponentType | string,
    breadcrumb: BreadcrumbComponentType | string,
    roles?: Role[],
    layout?: React.ElementType,
    children?: never,
}

export interface EntrypointConfig {
    baseUrl: string,
    component: React.ComponentType<EntrypointComponentProps>,
}

export interface EntrypointComponentProps {
    parentLayout?: React.ElementType,
}

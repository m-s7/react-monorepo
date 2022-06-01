import { ElementType } from 'react'
import { Role } from '@/constants/role'
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
    readonly component: ElementType,
    readonly title?: PageTitleComponentType | string,
    readonly breadcrumb?: BreadcrumbComponentType | string,
    readonly children?: RouteConfig[],
}

export interface RouteEntrypointConfig {
    readonly baseUrl: string,
    readonly component: ElementType,
}

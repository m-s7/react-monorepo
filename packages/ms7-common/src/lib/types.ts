import { Role } from '@ms7/auth'
import { RouterConfig } from '@ms7/router'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface Dictionary<T> { [x: string]: T }
export type StringDictionary = Dictionary<string>
export type CustomTypeDictionary<T> = Dictionary<T>

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>
export type Necessary<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export interface AppConfig {
    key: string,
    active: boolean,
    title: string,
    apiUrl?: string,
    menu: MenuConfig[],
    router: RouterConfig,
}

export interface MenuConfig {
    readonly path: string,
    readonly name: string,
    readonly icon?: IconProp,
    readonly roles?: Role[],
    readonly children?: MenuConfig[],
}

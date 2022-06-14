import { Role } from '@ms7/auth-providers'
import { LogLevel } from '@ms7/logger'
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
    log: Readonly<{ name: string, min: LogLevel }>,
    menu: MenuConfig[],
    router: RouterConfig,
    websocket?: WebsocketConfig,
}

export interface MenuConfig {
    readonly path: string,
    readonly name: string,
    readonly icon?: IconProp,
    readonly roles?: Role[],
    readonly children?: MenuConfig[],
}

export interface WebsocketConfig {
    name: string,
    url: string,
    headers?: StringDictionary,
}


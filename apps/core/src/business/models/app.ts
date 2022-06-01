import { LogLevel } from '@/constants/logger'
import { RouterConfig } from '@/business/models/router'
import { ReducerDictionary, StringDictionary } from '@/business/models/common'
import { MenuConfig } from '@/business/models/menu'

export interface StoreConfig {
    readonly reducers?: Readonly<ReducerDictionary>,
}

export interface WebsocketConfig {
    readonly name: string,
    readonly url: 'wsurl',
    readonly headers?: Readonly<StringDictionary>,
}

export interface AppConfig {
    readonly key: string,
    readonly active: 'active',
    readonly title: string,
    readonly url: 'url',
    readonly log: Readonly<{ name: string, min: LogLevel }>,
    readonly menu: MenuConfig[],
    readonly router: RouterConfig,
    readonly store?: StoreConfig,
    readonly websocket?: WebsocketConfig,
}

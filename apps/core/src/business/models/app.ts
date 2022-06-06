import { LogLevel } from '@ms7/logger'
import { RouterConfig } from '@ms7/router'
import { StringDictionary } from '@/business/models/common'
import { MenuConfig } from '@/business/models/menu'

export interface WebsocketConfig {
    readonly name: string,
    readonly url: string,
    readonly headers?: Readonly<StringDictionary>,
}

export interface AppConfig {
    readonly key: string,
    readonly active: boolean,
    readonly title: string,
    readonly apiUrl?: string,
    readonly log: Readonly<{ name: string, min: LogLevel }>,
    readonly menu: MenuConfig[],
    readonly router: RouterConfig,
    readonly websocket?: WebsocketConfig,
}

import { RestLoggerConfig } from './types'

const defaultConfig = {
    method: true,
    status: true,
    statusText: true,
    url: true,
    data: true,
    params: false,
}

export default class LogBuilder {
    private config: RestLoggerConfig
    private logMessage: Array<string | number> = []
    private _logData: object | undefined
    private _logParams: object | undefined

    constructor(config?: RestLoggerConfig) {
        this.config = config ?? defaultConfig
    }

    public method(method?: string): LogBuilder {
        if(method && this.config.method) this.logMessage.push(method.toUpperCase())

        return this
    }

    public status(status?: number, statusText?: string): LogBuilder {
        if(status && this.config.status) {
            if(statusText && this.config.statusText) this.logMessage.push(`${status}:${statusText.toUpperCase()}`)
            else this.logMessage.push(status)
        }

        return this
    }

    public url(url?: string, baseUrl?: string): LogBuilder {
        if(url && this.config.url) this.logMessage.push(new URL(url || '', baseUrl).href)

        return this
    }

    public data(data?: object): LogBuilder {
        if(data && this.config.data) this._logData = data

        return this
    }

    public params(params?: object): LogBuilder {
        if(params && this.config.params) this._logParams = params

        return this
    }

    public build(): string {
        return this.logMessage.join(' ')
    }

    get logParams(): object | undefined {
        return this._logParams
    }

    get logData(): object | undefined {
        return this._logData
    }
}

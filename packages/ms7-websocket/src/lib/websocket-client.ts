import { Client } from 'webstomp-client'

interface Websocket {
    connect(): void,
    disconnect(): void,
    reconnect(): void,
    onConnecting(): void,
    onConnected(): void,
    onDisconnected(): void,
    onReconnect(timeout: number): void,
    onConnectionClosed(): void,
    isConnected(): boolean,
    getUrl(): string,
    getName(): string,
    getHeaders(): Headers | undefined,
}

export type Headers = { [x: string]: string }

export type Callback = (isConnected: boolean) => void

export type StompProtocolClient = Client | undefined

export abstract class WebsocketClient implements Websocket {
    private _username: string | undefined
    private _sessionId: string | undefined
    private readonly _url: string
    private readonly _name: string
    private readonly _token: string | undefined
    private readonly _headers: Headers | undefined
    private readonly _callback: Callback

    protected reconnectTimeoutId = 0

    protected constructor(callback: Callback, token: string | undefined, name: string, url: string, headers?: Headers) {
        this._url = url
        this._name = name
        this._token = token
        this._headers = headers
        this._callback = callback
    }

    get username(): string | undefined {
        return this._username
    }

    set username(value: string | undefined) {
        this._username = value
    }

    get sessionId(): string | undefined {
        return this._sessionId
    }

    set sessionId(value: string | undefined) {
        this._sessionId = value
    }

    get callback(): Callback {
        return this._callback
    }

    getUrl(): string {
        return this._url
    }

    getName(): string {
        return this._name
    }

    getToken(): string | undefined {
        return this._token
    }

    getHeaders(): Headers | undefined {
        return (this._headers || undefined)
    }

    reconnect(): void {
        const timeout = 5000

        this.onReconnect(timeout)
        this.reconnectTimeoutId = window.setTimeout(() => this.connect(), timeout)
    }

    abstract connect(): void

    abstract disconnect(): void

    abstract isConnected(): boolean

    abstract onConnecting(): void

    abstract onConnected(): void

    abstract onDisconnected(): void

    abstract onReconnect(timeout: number): void

    abstract onConnectionClosed(): void

    abstract getProtocolClient(): unknown
}
import SockJS, { CloseEvent } from 'sockjs-client'
import Stomp from 'webstomp-client'
import { WebsocketClient } from '../websocket-client'
import { Headers, Callback, StompProtocolClient } from '../websocket-client'

export abstract class StompClient extends WebsocketClient {
    private socket: WebSocket | undefined
    private stompClient: StompProtocolClient

    protected constructor(callback: Callback, token: string | undefined, name: string, url: string, headers?: Headers) {
        super(callback, token, name, url, headers)

        this.sessionId = (Math.random() + 1).toString(36).substring(4)
    }

    connect(): void {
        const headers: { [x: string]: string } = (this.getToken() ? { 'Authorization': `Bearer ${this.getToken()}`, ...this.getHeaders() } : { ...this.getHeaders() })

        this.onConnecting()

        this.socket = new SockJS(this.getUrl(), [], {
            sessionId: () => (this.sessionId as string),
        })

        this.stompClient = Stomp.over(this.socket, {
            // debug: isDev(),
            debug: false,
            heartbeat: { incoming: 1000, outgoing: 1000 },
        })

        this.stompClient.connect(
            headers,
            frame => {
                this.username = frame?.headers['user-name']

                this.callback(true)
                this.onConnected()
            },
            error => {
                if((error as CloseEvent).type === 'close') {
                    this.callback(false)
                    this.onConnectionClosed()

                    if(this.stompClient) this.reconnect()
                }
            },
        )
    }

    disconnect(): void {
        window.clearTimeout(this.reconnectTimeoutId)
        this.callback(false)

        if(this.stompClient?.connected)
            this.stompClient?.disconnect()

        this.socket?.close()

        this.socket = undefined
        this.stompClient = undefined

        this.onDisconnected()
    }

    isConnected(): boolean {
        return this.stompClient?.connected || false
    }
    
    getProtocolClient(): StompProtocolClient {
        return this.stompClient
    }
}
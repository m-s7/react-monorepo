import { logging } from '@/business/log-manager'
import StompClient from '@/lib/websocket/lib/clients/stomp-client'
import { Headers, Callback, StompProtocolClient } from '@/lib/websocket/lib/websocket-client'
import EventBus from "@/lib/event-bus";

export default class WebsocketClient extends StompClient {
    private logger = logging.getLogger('websocket')

    constructor(callback: Callback, token: string | undefined, name: string, url: string, headers?: Headers) {
        super(callback, token, name, url, headers)
    }

    onConnecting(): void {
        this.logger.debug('Connecting to', this.getUrl())
    }

    onConnected(): void {
        const stompClient = this.getProtocolClient()
        if(!stompClient) return

        this.logger.debug('Connected to', this.getUrl())

        this.subscribeGreetings(stompClient)

        setTimeout(() => {
            stompClient.send('/app/hello', JSON.stringify({ 'name': 'Michał' }))
        }, 2500)
    }

    onReconnect(timeout: number): void {
        this.logger.debug(`Reconnecting in ${timeout / 1000}s`, this.getUrl())
    }

    onDisconnected(): void {
        this.logger.debug('Disconnected', this.getUrl())
    }

    onConnectionClosed(): void {
        this.logger.debug('Connection closed', this.getUrl())
    }

    private subscribeGreetings(stompClient: StompProtocolClient): void {
        if(!stompClient) return

        const destination = '/topic/greetings'
        stompClient.subscribe(destination,  ({ body }) => {
            EventBus.dispatch('dummy-ws-message', JSON.parse(body))
            this.logger.debug('Message received on', destination, JSON.parse(body))
        })
        this.logger.debug('Subscribed', destination)
    }
}

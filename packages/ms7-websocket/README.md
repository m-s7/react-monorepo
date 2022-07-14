# Websocket

Websocket client with multiple protocol support and react integration.

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable) to install.

```bash
yarn install
```

## Scripts

To run test suite:
```bash
yarn test
```

To build:
```bash
yarn build
```

To run linter:
```bash
yarn lint
```

To remove apps and packages temp directories:
```bash
yarn clean
```

If you need more options use [turbo](https://turborepo.org/docs/core-concepts/filtering) cli command.

## Usage

```tsx
<WebsocketProvider provider={provider}>
    <p>children</p>
</WebsocketProvider>
```

### Example

#### child-websocket-client.tsx

```ts
import { StompClient } from '@ms7/websocket'
import { Headers, Callback, StompProtocolClient } from '@ms7/websocket'

export default class ChildWebsocketClient extends StompClient {
    constructor(callback: Callback, token: string | undefined, name: string, url: string, headers?: Headers) {
        super(callback, token, name, url, headers)
    }

    onConnecting(): void {
        // client connecting
    }

    onConnected(): void {
        // client connected
        
        const stompClient = this.getProtocolClient()
        if(!stompClient) return

        this.subscribe(stompClient)
    }

    onReconnect(timeout: number): void {
        // client reconnecting
    }

    onDisconnected(): void {
        // client diconnected
    }

    onConnectionClosed(): void {
        // connection closed
    }

    private subscribe(stompClient: StompProtocolClient): void {
        if(!stompClient) return

        const destination = '/topic/example'
        stompClient.subscribe(destination, ({ body }) => {
            console.log(`Message received: ${JSON.parse(body)}`)
        })
    }
}

```

#### child-websocket-provider.tsx

```tsx
import ChildWebsocketClient from './child-websocket-client'
import { WebsocketProviderComponentProps } from '@ms7/websocket'
import { WebsocketClient } from '@ms7/websocket'

const ChildWebsocketProvider = (props: WebsocketProviderComponentProps) => {
    let websocketClient: WebsocketClient | undefined

    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if(websocketClient) return

        const callback = (isConnected: boolean): void => { setIsConnected(isConnected) }

        websocketClient = new CoreWebsocketClient(callback, 'my-token', 'example', 'ws://localhost')
        websocketClient.connect()

        // IMPORTANT: notify provider that ws instance is ready
        props.onLoad(websocketClient)
    }, [])

    useEffect(() => () => {
        websocketClient?.disconnect()
        websocketClient = undefined
    }, [])

    return (
        <React.Fragment>
            {isConnected && props.children}
            {!isConnected && <div>WS Loading...</div>}
        </React.Fragment>
    )
}

export default ChildWebsocketProvider
```

#### app.tsx

```tsx
import React from 'react'
import ChildWebsocketProvider from './child-websocket-provider'
import { WebsocketProvider } from '@ms7/websocket'

const App = () => (
    <WebsocketProvider provider={CoreWebsocketProvider}>
        <div>WS Example</div>
    </WebsocketProvider>
)

export default App
```
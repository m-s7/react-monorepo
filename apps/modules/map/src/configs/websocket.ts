import { WebsocketConfig } from '@ms7/common'
import { env } from '@ms7/common'

const config: WebsocketConfig = {
    name: 'map',
    url: env.REACT_APP_MAP_WEBSOCKET_URL,
}

export default config
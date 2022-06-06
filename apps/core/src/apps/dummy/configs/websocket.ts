import { WebsocketConfig } from '@ms7/common'
import { env } from '@ms7/common'

const config: WebsocketConfig = {
    name: 'dummy',
    url: env.REACT_APP_DUMMY_WEBSOCKET_URL,
}

export default config
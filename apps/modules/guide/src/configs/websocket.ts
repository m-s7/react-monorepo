import { WebsocketConfig } from '@ms7/common'
import { env } from '@ms7/common'

const config: WebsocketConfig = {
    name: 'guide',
    url: env.REACT_APP_GUIDE_WEBSOCKET_URL,
}

export default config
import { WebsocketConfig } from '@/business/models/app'
import env from '@/env'

const getConfig = (): WebsocketConfig => ({
    name: 'map',
    url: env.REACT_APP_MAP_WEBSOCKET_URL,
})

export default getConfig
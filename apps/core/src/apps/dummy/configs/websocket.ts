import { WebsocketConfig } from '@/business/models/app'
import env from '@/env'

const getConfig = (): WebsocketConfig => ({
    name: 'dummy',
    url: env.REACT_APP_DUMMY_WEBSOCKET_URL,
})

export default getConfig
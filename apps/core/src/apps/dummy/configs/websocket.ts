import { WebsocketConfig } from '@/business/models/app'

const getConfig = (): WebsocketConfig => ({
    name: 'dummy',
    url: 'wsurl',
})

export default getConfig
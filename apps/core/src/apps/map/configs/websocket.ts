import { WebsocketConfig } from '@/business/models/app'

const getConfig = (): WebsocketConfig => ({
    name: 'map',
    url: 'wsurl',
})

export default getConfig
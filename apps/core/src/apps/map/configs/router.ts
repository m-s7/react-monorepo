import Index from 'Map/pages'
import { RouterConfig } from '@/business/models/router'
import App from 'Map/app'

const getConfig = (): RouterConfig => ({
    entrypoint: {
        baseUrl: '/map/*',
        component: App,
    },
    routes: [
        { path: '/', component: Index, title: 'Map', breadcrumb: 'Map' },
    ],
})

export default getConfig
import Index from 'Map/pages'
import { RouterConfig } from '@ms7/router'
import Entrypoint from 'Map/entrypoint'

const config: RouterConfig = {
    entrypoint: {
        baseUrl: '/map/*',
        component: Entrypoint,
    },
    routes: [
        { path: '/', component: Index, title: 'Map', breadcrumb: 'Map' },
    ],
}

export default config
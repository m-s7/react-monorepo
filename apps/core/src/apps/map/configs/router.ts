import Index from 'Map/pages'
import { RouterConfig } from '@ms7/router'
import IndexEntrypoint from 'Map/index'

const config: RouterConfig = {
    entrypoint: {
        baseUrl: '/map/*',
        component: IndexEntrypoint,
    },
    routes: [
        { path: '/', component: Index, title: 'Map', breadcrumb: 'Map' },
    ],
}

export default config
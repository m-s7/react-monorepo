import Index from 'Map/pages'
import { RouterConfig } from '@ms7/router'

const config: RouterConfig = {
    routes: [
        { path: '/', component: Index, title: 'Map', breadcrumb: 'Map' },
    ],
}

export default config
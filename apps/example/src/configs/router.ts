import Index from '@/pages'
import { RouterConfig } from '@ms7/router'

const config: RouterConfig = {
    routes: [
        { path: '/', component: Index, title: 'Home', breadcrumb: 'Home' },
    ],
}

export default config
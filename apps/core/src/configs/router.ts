import Dashboard from '@/pages/dashboard'
import { RouterConfig } from '@ms7/router'

const config: RouterConfig = {
    routes: [
        { path: '/', component: Dashboard, title: 'Dashboard', breadcrumb: 'Dashboard' },
    ],
}

export default config
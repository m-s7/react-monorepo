import { RouterConfig } from '@ms7/router'
import Index from 'Guide/pages'
import Rest from 'Guide/components/pages/index/rest'
import Redux from 'Guide/components/pages/index/redux'

const config: RouterConfig = {
    routes: [
        { component: Index, title: 'Guide', breadcrumb: 'Guide',
            children: [
                { path: 'rest', component: Rest, title: 'Guide Rest', breadcrumb: 'Guide Rest' },
                { path: 'redux', component: Redux, title: 'Guide Redux', breadcrumb: 'Guide Redux' },
            ],
        },
        // { path: '/', component: Index, title: 'Index', breadcrumb: 'Index' },
        // { path: '/about', component: About, title: 'About', breadcrumb: 'About' },
        // { path: '/counter', component: Counter, title: 'Counter', breadcrumb: 'Counter' },
        // { path: '/static', component: Static, title: 'Static', breadcrumb: 'Static' },
    ],
}

export default config
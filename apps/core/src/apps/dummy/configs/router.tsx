import Index from 'Dummy/pages'
import About from 'Dummy/pages/about'
import Counter from 'Dummy/pages/counter'
import Static from 'Dummy/pages/static'
import { RouterConfig } from '@ms7/router'
import IndexEntrypoint from 'Dummy/index'

const config: RouterConfig = {
    entrypoint: {
        baseUrl: '/dummy/*',
        component: IndexEntrypoint,
    },
    routes: [
        { path: '/', component: Index, title: 'Dummy', breadcrumb: 'Dummy' },
        { path: '/about', component: About, title: 'About', breadcrumb: 'About' },
        { path: '/counter', component: Counter, title: 'Counter', breadcrumb: 'Counter' },
        { path: '/static', component: Static, title: 'Static', breadcrumb: 'Static' },
    ],
}

export default config
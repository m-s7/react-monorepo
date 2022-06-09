import Dashboard from '@/pages/dashboard'
import { RouterConfig } from '@ms7/router'
import { Role } from '@ms7/auth-providers'
import Account from '@/pages/user/account'
import Rest from '@/components/pages/example/rest'

const { GUEST, USER, ADMIN } = Role
const config: RouterConfig = {
    routes: [
        { path: '/', component: Dashboard, title: 'Dashboard', breadcrumb: 'Dashboard' },
        // { path: '/about', component: About, title: 'About', breadcrumb: 'About', layout: LayoutRed },
        // { path: '/about/child', component: AboutChild, roles: [GUEST], title: 'Child', breadcrumb: 'AboutChild' },
        // { path: '/about/other', component: AboutOther, title: 'Other', breadcrumb: 'AboutOther' },
        // { path: '/about/:id/:name/:age', component: About, title: 'With Params', breadcrumb: 'With Params' },
        // { path: '/about/deeper', component: AboutOther, title: 'Deeper', breadcrumb: 'Deeper' },
        // { path: '/about/deeper/deepest', component: AboutOther, title: 'Deepest', breadcrumb: 'Deepest' },
        // { path: '/about/shallow', component: AboutOther, title: 'Shallow', breadcrumb: 'Shallow' },
        // { path: '/user', component: User, title: 'User', breadcrumb: 'User',
        //     children: [
        //         { index: true, component: Profile, title: 'Profile', breadcrumb: 'Profile' },
        //         { path: 'profile', component: Profile, title: 'Profile', breadcrumb: 'Profile' },
        //         { path: 'account', roles: [ADMIN], component: Account, title: 'Account', breadcrumb: 'Account' },
        //     ],
        // },
    ],
}

export default config
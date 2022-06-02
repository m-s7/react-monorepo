import Dashboard from '@/pages/dashboard'
import { RouterConfig } from '@/business/models/router'
import { Role } from '@/constants/role'
import User from '@/pages/user'
import Profile from '@/pages/user/profile'
import Account from '@/pages/user/account'
import About from '@/pages/about'
import AboutChild from '@/pages/about-child'
import AboutOther from '@/pages/about-other'
import { Optional } from '@/business/models/common'

const { GUEST, USER, ADMIN } = Role
const getConfig = (): Optional<RouterConfig, 'entrypoint'> => ({
    routes: [
        { path: '/', component: Dashboard, title: 'Dashboard', breadcrumb: 'Dashboard' },
        { path: '/about', component: About, title: 'About', breadcrumb: 'About' },
        { path: '/about/child', component: AboutChild, roles: [ADMIN], title: 'Child', breadcrumb: 'AboutChild' },
        { path: '/about/other', component: AboutOther, title: 'Other', breadcrumb: 'AboutOther' },
        { path: '/about/:id/:name/:age', component: About, title: 'With Params', breadcrumb: 'With Params' },
        { path: '/about/deeper', component: AboutOther, title: 'Deeper', breadcrumb: 'Deeper' },
        { path: '/about/deeper/deepest', component: AboutOther, title: 'Deepest', breadcrumb: 'Deepest' },
        { path: '/about/shallow', component: AboutOther, title: 'Shallow', breadcrumb: 'Shallow' },
        { path: '/user', component: User, title: 'User', breadcrumb: 'User',
            children: [
                { index: true, component: Profile, title: 'Profile', breadcrumb: 'Profile' },
                { path: 'profile', component: Profile, title: 'Profile', breadcrumb: 'Profile' },
                { path: 'account', roles: [ADMIN], component: Account, title: 'Account', breadcrumb: 'Account' },
                { path: 'user2', component: User, title: 'User2', breadcrumb: 'User2',
                    children: [
                        { index: true, component: Profile, title: 'Profile2', breadcrumb: 'Profiles2' },
                        { path: 'profile2', component: Profile, title: 'Profile2', breadcrumb: 'Profile2' },
                        { path: 'account2', component: Account, title: 'Account2', breadcrumb: 'Account2' },
                        { path: 'user3', component: User, title: 'User3', breadcrumb: 'User3',
                            children: [
                                { index: true, component: Profile, title: 'Profile3', breadcrumb: 'Profile3' },
                                { path: 'profile3', component: Profile, title: 'Profile3', breadcrumb: 'Profile3' },
                                { path: 'account3', component: Account, title: 'Account3', breadcrumb: 'Account3' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
})

export default getConfig
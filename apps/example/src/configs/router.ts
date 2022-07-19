import Index from '@/pages'
import Admin from '@/components/pages/admin'
import Login from '@/components/pages/login'
import { RouterConfig } from '@ms7/router'
import i18n from '@/i18n'
import { Role } from '@ms7/auth-providers'
import { LayoutEmpty } from '@ms7/bui'

const config: RouterConfig = {
    routes: [
        { path: '/', component: Index, title: i18n.t('router.home'), breadcrumb: i18n.t('router.home') },
        { path: '/admin', component: Admin, title: i18n.t('router.admin'), breadcrumb: i18n.t('router.admin'), roles: [Role.ADMIN] },
        { path: '/login', component: Login, title: i18n.t('router.login'), breadcrumb: i18n.t('router.login'), layout: LayoutEmpty },
    ],
}

export default config
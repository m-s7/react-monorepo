import Index from '@/pages'
import Admin from '@/components/pages/admin'
import { RouterConfig } from '@ms7/router'
import i18n from '@/i18n'
import { Role } from '@ms7/auth-providers'

const config: RouterConfig = {
    routes: [
        { path: '/', component: Index, title: i18n.t('router.home'), breadcrumb: i18n.t('router.home'), roles: [Role.USER] },
        { path: '/admin', component: Admin, title: i18n.t('router.admin'), breadcrumb: i18n.t('router.admin'), roles: [Role.ADMIN] },
    ],
}

export default config
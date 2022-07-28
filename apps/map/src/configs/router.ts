import Index from 'Map/pages'
import { RouterConfig } from '@ms7/router'
import i18n from 'Map/i18n'
import { Role } from '@ms7/auth'

const config: RouterConfig = {
    routes: [
        { path: '/', component: Index, title: i18n.t('router.map'), breadcrumb: i18n.t('router.map'), roles: [Role.USER] },
    ],
}

export default config
import Index from '@/pages'
import { RouterConfig } from '@ms7/router'
import i18n from '@/i18n'

const config: RouterConfig = {
    routes: [
        { path: '/', component: Index, title: i18n.t('router.home'), breadcrumb: i18n.t('router.home') },
    ],
}

export default config
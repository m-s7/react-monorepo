import Index from '@/pages'
import { RouterConfig } from '@ms7/router'
import i18n from '@/i18n'

const config: RouterConfig = {
    routes: [
        { path: '/', component: Index, title: i18n.t('Home'), breadcrumb: i18n.t('Home') },
    ],
}

export default config
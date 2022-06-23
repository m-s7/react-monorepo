import { RouterConfig } from '@ms7/router'
import Index from 'Guide/pages'
import Rest from 'Guide/components/pages/index/rest'
import RestRTK from 'Guide/components/pages/index/rest/rtk'
import RestRedux from 'Guide/components/pages/index/rest/redux'
import Redux from 'Guide/components/pages/index/redux'
import EventBus from 'Guide/components/pages/index/event-bus'
import RxjsSubject from 'Guide/components/pages/index/rxjs-subject'
import LazySuspense from 'Guide/components/pages/index/lazy-suspense'
import i18n from 'Guide/i18n'

const config: RouterConfig = {
    routes: [
        { component: Index,
            children: [
                { component: Rest,
                    children: [
                        { path: 'rest-rtk', component: RestRTK, title: i18n.t('router.rest-rtk'), breadcrumb: i18n.t('router.rest-rtk') },
                        { path: 'rest-redux', component: RestRedux, title: i18n.t('router.rest-redux'), breadcrumb: i18n.t('router.rest-redux') },
                    ],
                },
                { path: 'redux', component: Redux, title: i18n.t('router.redux'), breadcrumb: i18n.t('router.redux') },
                { path: 'event-bus', component: EventBus, title: i18n.t('router.event-bus'), breadcrumb: i18n.t('router.event-bus') },
                { path: 'rxjs-subject', component: RxjsSubject, title: i18n.t('router.rxjs-subject'), breadcrumb: i18n.t('router.rxjs-subject') },
                { path: 'lazy-suspense', component: LazySuspense, title: i18n.t('router.lazy-suspense'), breadcrumb: i18n.t('router.lazy-suspense') },
            ],
        },
    ],
}

export default config
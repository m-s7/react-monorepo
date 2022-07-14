import { RouterConfig } from '@ms7/router'
import Index from 'Core/pages'
import Rest from 'Core/components/pages/index/rest'
import GraphQL from 'Core/components/pages/index/rest/graph-ql'
import RestRQ from 'Core/components/pages/index/rest/rest-rq'
import Redux from 'Core/components/pages/index/redux'
import EventBus from 'Core/components/pages/index/event-bus'
import RxjsSubject from 'Core/components/pages/index/rxjs-subject'
import LazySuspense from 'Core/components/pages/index/lazy-suspense'
import i18n from 'Core/i18n'

const config: RouterConfig = {
    routes: [
        { component: Index,
            children: [
                { component: Rest,
                    children: [
                        { path: 'graph-ql', component: GraphQL, title: i18n.t('router.graph-ql'), breadcrumb: i18n.t('router.graph-ql') },
                        { path: 'rest-rq', component: RestRQ, title: i18n.t('router.rest-rq'), breadcrumb: i18n.t('router.rest-rq') },
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
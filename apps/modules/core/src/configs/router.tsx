import { RouterConfig } from '@ms7/router'
import Index from 'Core/pages'
import Rest from 'Core/components/pages/index/rest'
import GraphQL from 'Core/components/pages/index/rest/graph-ql'
import RestRQ from 'Core/components/pages/index/rest/rest-rq'
import Memo from 'Core/components/pages/index/memo'
import Modal from 'Core/components/pages/index/modal'
import Redux from 'Core/components/pages/index/redux'
import Callback from 'Core/components/pages/index/callback'
import EventBus from 'Core/components/pages/index/event-bus'
import RxjsSubject from 'Core/components/pages/index/rxjs-subject'
import LazySuspense from 'Core/components/pages/index/lazy-suspense'
import i18n from 'Core/i18n'
import { Role } from '@ms7/auth'

const config: RouterConfig = {
    routes: [
        { component: Index,
            children: [
                { component: Rest,
                    children: [
                        { path: 'graph-ql', component: GraphQL, title: i18n.t('router.graph-ql'), breadcrumb: i18n.t('router.graph-ql'), roles: [Role.USER] },
                        { path: 'rest-rq', component: RestRQ, title: i18n.t('router.rest-rq'), breadcrumb: i18n.t('router.rest-rq'), roles: [Role.USER] },
                    ],
                },
                { path: 'memo', component: Memo, title: i18n.t('router.memo'), breadcrumb: i18n.t('router.memo'), roles: [Role.USER] },
                { path: 'modal', component: Modal, title: i18n.t('router.modal'), breadcrumb: i18n.t('router.modal'), roles: [Role.USER] },
                { path: 'redux', component: Redux, title: i18n.t('router.redux'), breadcrumb: i18n.t('router.redux'), roles: [Role.USER] },
                { path: 'callback', component: Callback, title: i18n.t('router.callback'), breadcrumb: i18n.t('router.callback'), roles: [Role.USER] },
                { path: 'event-bus', component: EventBus, title: i18n.t('router.event-bus'), breadcrumb: i18n.t('router.event-bus'), roles: [Role.USER] },
                { path: 'rxjs-subject', component: RxjsSubject, title: i18n.t('router.rxjs-subject'), breadcrumb: i18n.t('router.rxjs-subject'), roles: [Role.USER] },
                { path: 'lazy-suspense', component: LazySuspense, title: i18n.t('router.lazy-suspense'), breadcrumb: i18n.t('router.lazy-suspense'), roles: [Role.USER] },
            ],
        },
    ],
}

export default config
import { RouterConfig } from '@ms7/router'
import Index from 'Core/pages'
import { Rest, RestRQ, GraphQL } from 'Core/features/rest'
import { Memo } from 'Core/features/memo'
import { Modal } from 'Core/features/modal'
import { Redux } from 'Core/features/redux'
import { Callback } from 'Core/features/callback'
import { EventBus } from 'Core/features/event-bus'
import { RxJsSubject } from 'Core/features/rxjs-subject'
import { LazySuspense } from 'Core/features/lazy-suspense'
import i18n from 'Core/i18n'
import { Role } from '@ms7/auth'

const config: RouterConfig = {
    routes: [
        { component: Index,roles: [Role.USER],
            children: [
                { component: Rest,
                    children: [
                        { path: 'graph-ql', component: GraphQL, title: i18n.t('router.graph-ql'), breadcrumb: i18n.t('router.graph-ql') },
                        { path: 'rest-rq', component: RestRQ, title: i18n.t('router.rest-rq'), breadcrumb: i18n.t('router.rest-rq') },
                    ],
                },
                { path: 'memo', component: Memo, title: i18n.t('router.memo'), breadcrumb: i18n.t('router.memo') },
                { path: 'modal', component: Modal, title: i18n.t('router.modal'), breadcrumb: i18n.t('router.modal') },
                { path: 'redux', component: Redux, title: i18n.t('router.redux'), breadcrumb: i18n.t('router.redux') },
                { path: 'callback', component: Callback, title: i18n.t('router.callback'), breadcrumb: i18n.t('router.callback') },
                { path: 'event-bus', component: EventBus, title: i18n.t('router.event-bus'), breadcrumb: i18n.t('router.event-bus') },
                { path: 'rxjs-subject', component: RxJsSubject, title: i18n.t('router.rxjs-subject'), breadcrumb: i18n.t('router.rxjs-subject') },
                { path: 'lazy-suspense', component: LazySuspense, title: i18n.t('router.lazy-suspense'), breadcrumb: i18n.t('router.lazy-suspense') },
            ],
        },
    ],
}

export default config
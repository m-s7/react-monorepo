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
                { path: 'rxjs-subject', component: RxJsSubject, title: i18n.t('router.rxjs-subject'), breadcrumb: i18n.t('router.rxjs-subject'), roles: [Role.USER] },
                { path: 'lazy-suspense', component: LazySuspense, title: i18n.t('router.lazy-suspense'), breadcrumb: i18n.t('router.lazy-suspense'), roles: [Role.USER] },
            ],
        },
    ],
}

export default config
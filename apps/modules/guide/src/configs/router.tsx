import { RouterConfig } from '@ms7/router'
import Index from 'Guide/pages'
import Rest from 'Guide/components/pages/index/rest'
import RestRTK from 'Guide/components/pages/index/rest/rtk'
import RestRedux from 'Guide/components/pages/index/rest/redux'
import Redux from 'Guide/components/pages/index/redux'
import EventBus from 'Guide/components/pages/index/event-bus'
import RxjsSubject from 'Guide/components/pages/index/rxjs-subject'
import LazySuspense from 'Guide/components/pages/index/lazy-suspense'

const config: RouterConfig = {
    routes: [
        { component: Index,
            children: [
                { component: Rest,
                    children: [
                        { path: 'rest-rtk', component: RestRTK, title: 'Guide Rest (RTK)', breadcrumb: 'Guide Rest (RTK)' },
                        { path: 'rest-redux', component: RestRedux, title: 'Guide Rest (Redux)', breadcrumb: 'Guide Rest (Redux)' },
                    ],
                },
                { path: 'redux', component: Redux, title: 'Guide Redux', breadcrumb: 'Guide Redux' },
                { path: 'event-bus', component: EventBus, title: 'Guide EventBus', breadcrumb: 'Guide EventBus' },
                { path: 'rxjs-subject', component: RxjsSubject, title: 'Guide RxJsSubject', breadcrumb: 'Guide RxJsSubject' },
                { path: 'lazy-suspense', component: LazySuspense, title: 'Guide LazySuspense', breadcrumb: 'Guide LazySuspense' },
            ],
        },
    ],
}

export default config
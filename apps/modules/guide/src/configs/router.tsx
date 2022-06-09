import { RouterConfig } from '@ms7/router'
import Index from 'Guide/pages'
import Rest from 'Guide/components/pages/index/rest'
import Redux from 'Guide/components/pages/index/redux'
import EventBus from 'Guide/components/pages/index/event-bus'
import RxjsSubject from 'Guide/components/pages/index/rxjs-subject'

const config: RouterConfig = {
    routes: [
        { component: Index, title: 'Guide', breadcrumb: 'Guide',
            children: [
                { path: 'rest', component: Rest, title: 'Guide Rest', breadcrumb: 'Guide Rest' },
                { path: 'redux', component: Redux, title: 'Guide Redux', breadcrumb: 'Guide Redux' },
                { path: 'event-bus', component: EventBus, title: 'Guide EventBus', breadcrumb: 'Guide EventBus' },
                { path: 'rxjs-subject', component: RxjsSubject, title: 'Guide RxJsSubject', breadcrumb: 'Guide RxJsSubject' },
            ],
        },
    ],
}

export default config
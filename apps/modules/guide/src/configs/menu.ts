import { MenuConfig } from '@ms7/common'

const config: MenuConfig[] = [
    { path: '#', name: 'Guide', icon: 'book-open',
        children: [
            { path: '#', name: 'Rest', icon: 'network-wired',
                children: [
                    { path: '/guide/rest-rtk', name: 'Rest (RTK)' },
                    { path: '/guide/rest-redux', name: 'Rest (Redux)' },
                ],
            },
            { path: '/guide/redux', name: 'Redux', icon: 'box-open' },
            { path: '/guide/event-bus', name: 'EventBus', icon: 'bullhorn' },
            { path: '/guide/rxjs-subject', name: 'RxJsSubject', icon: 'tower-broadcast' },
            { path: '/guide/lazy-suspense', name: 'LazySuspense', icon: 'bed' },
        ],
    },
]

export default config
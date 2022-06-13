import { MenuConfig } from '@ms7/common'

const config: MenuConfig[] = [
    { path: '#', name: 'Guide', icon: 'book-open',
        children: [
            { path: '/guide/rest', name: 'Rest', icon: 'network-wired' },
            { path: '/guide/redux', name: 'Redux', icon: 'box-open' },
            { path: '/guide/event-bus', name: 'EventBus', icon: 'bullhorn' },
            { path: '/guide/rxjs-subject', name: 'RxJsSubject', icon: 'tower-broadcast' },
            { path: '/guide/lazy-suspense', name: 'LazySuspense', icon: 'bed' },
        ],
    },
]

export default config
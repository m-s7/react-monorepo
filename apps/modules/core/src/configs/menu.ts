import { MenuConfig } from '@ms7/common'
import i18n from 'Core/i18n'

const config: MenuConfig[] = [
    { path: '#', name: i18n.t('menu.core'), icon: 'book-open',
        children: [
            { path: '#', name: i18n.t('menu.rest'), icon: 'network-wired',
                children: [
                    { path: '/core/graph-ql', name: i18n.t('menu.graph-ql') },
                    { path: '/core/rest-rq', name: i18n.t('menu.rest-rq') },
                ],
            },
            { path: '/core/redux', name: i18n.t('menu.redux'), icon: 'box-open' },
            { path: '/core/event-bus', name: i18n.t('menu.event-bus'), icon: 'bullhorn' },
            { path: '/core/rxjs-subject', name: i18n.t('menu.rxjs-subject'), icon: 'tower-broadcast' },
            { path: '/core/lazy-suspense', name: i18n.t('menu.lazy-suspense'), icon: 'bed' },
        ],
    },
]

export default config
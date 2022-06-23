import { MenuConfig } from '@ms7/common'
import i18n from 'Guide/i18n'

const config: MenuConfig[] = [
    { path: '#', name: i18n.t('menu.guide'), icon: 'book-open',
        children: [
            { path: '#', name: i18n.t('menu.rest'), icon: 'network-wired',
                children: [
                    { path: '/guide/rest-rtk', name: i18n.t('menu.rest-rtk') },
                    { path: '/guide/rest-redux', name: i18n.t('menu.rest-redux') },
                ],
            },
            { path: '/guide/redux', name: i18n.t('menu.redux'), icon: 'box-open' },
            { path: '/guide/event-bus', name: i18n.t('menu.event-bus'), icon: 'bullhorn' },
            { path: '/guide/rxjs-subject', name: i18n.t('menu.rxjs-subject'), icon: 'tower-broadcast' },
            { path: '/guide/lazy-suspense', name: i18n.t('menu.lazy-suspense'), icon: 'bed' },
        ],
    },
]

export default config
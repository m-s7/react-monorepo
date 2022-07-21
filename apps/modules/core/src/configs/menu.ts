import { MenuConfig } from '@ms7/common'
import i18n from 'Core/i18n'
import { faBed } from '@fortawesome/free-solid-svg-icons/faBed'
import { faMemory } from '@fortawesome/free-solid-svg-icons/faMemory'
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons/faBoxOpen'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen'
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons/faNetworkWired'
import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons/faTowerBroadcast'
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons/faArrowRotateLeft'

const config: MenuConfig[] = [
    { path: '#', name: i18n.t('menu.core'), icon: faBookOpen,
        children: [
            { path: '#', name: i18n.t('menu.rest'), icon: faNetworkWired,
                children: [
                    { path: '/core/graph-ql', name: i18n.t('menu.graph-ql') },
                    { path: '/core/rest-rq', name: i18n.t('menu.rest-rq') },
                ],
            },
            { path: '/core/memo', name: i18n.t('menu.memo'), icon: faMemory },
            { path: '/core/modal', name: i18n.t('menu.modal'), icon: faSquare },
            { path: '/core/redux', name: i18n.t('menu.redux'), icon: faBoxOpen },
            { path: '/core/callback', name: i18n.t('menu.callback'), icon: faArrowRotateLeft },
            { path: '/core/event-bus', name: i18n.t('menu.event-bus'), icon: faBullhorn },
            { path: '/core/rxjs-subject', name: i18n.t('menu.rxjs-subject'), icon: faTowerBroadcast },
            { path: '/core/lazy-suspense', name: i18n.t('menu.lazy-suspense'), icon: faBed },
        ],
    },
]

export default config
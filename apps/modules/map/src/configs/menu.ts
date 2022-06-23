import { MenuConfig } from '@ms7/common'
import i18n from 'Map/i18n'

const config: MenuConfig[] = [
    { path: '#', name: i18n.t('menu.map'), icon: 'gamepad',
        children: [
            { path: '/map', name: i18n.t('menu.map-engine'), icon: 'map' },
        ],
    },
]

export default config
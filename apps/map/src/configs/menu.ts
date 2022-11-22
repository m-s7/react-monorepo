import { MenuConfig } from '@ms7/common'
import i18n from 'Map/i18n'
import { faMap } from '@fortawesome/free-solid-svg-icons/faMap'
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad'

const config: MenuConfig[] = [
    { path: '#', name: i18n.t('menu.map'), icon: faMap,
        children: [
            { path: '/map', name: i18n.t('menu.map-engine'), icon: faGamepad },
        ],
    },
]

export default config
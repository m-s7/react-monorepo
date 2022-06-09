import { MenuConfig } from '@ms7/common'

const config: MenuConfig[] = [
    { path: '#', name: 'Map Engine', icon: 'map',
        children: [
            { path: '/map', name: 'Map', icon: 'gamepad' },
        ],
    },
]

export default config
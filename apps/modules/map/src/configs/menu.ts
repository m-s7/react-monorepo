import { MenuConfig } from '@ms7/common'

const config: MenuConfig[] = [
    { path: '#', name: 'Module2', icon: 'home',
        children: [
            { path: '/map', name: 'Map', icon: 'map' },
        ],
    },
]

export default config
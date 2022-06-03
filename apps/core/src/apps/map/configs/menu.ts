import { MenuConfig } from '@/business/models/menu'

const config: MenuConfig[] = [
    { path: '#', name: 'Module2', icon: 'home',
        children: [
            { path: '/map', name: 'Map', icon: 'map' },
        ],
    },
]

export default config
import { MenuConfig } from '@/business/models/menu'

const getConfig = (): MenuConfig[] => [
    { path: '#', name: 'Module2', icon: 'home',
        children: [
            { path: '/map', name: 'Map', icon: 'map' },
        ],
    },
]

export default getConfig
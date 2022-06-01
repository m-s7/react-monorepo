import { MenuConfig } from '@/business/models/menu'

const getConfig = (): MenuConfig[] => [
    { path: '#', name: 'Module1', icon: 'home',
        children: [
            { path: '/dummy', name: 'Dummy', icon: 'home' },
            { path: '/dummy/about', name: 'About', icon: 'home' },
            { path: '/dummy/counter', name: 'Counter', icon: 'home' },
            { path: '/dummy/static', name: 'Static', icon: 'home' },
        ],
    },
]

export default getConfig
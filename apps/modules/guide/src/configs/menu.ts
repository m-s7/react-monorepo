import { MenuConfig } from '@ms7/common'

const config: MenuConfig[] = [
    { path: '#', name: 'Guide', icon: 'book-open',
        children: [
            { path: '/guide/rest', name: 'Rest', icon: 'network-wired' },
            { path: '/guide/redux', name: 'Redux', icon: 'box-open' },
            { path: '/guide/provider', name: 'Provider', icon: 'box' },
        ],
    },
]

export default config
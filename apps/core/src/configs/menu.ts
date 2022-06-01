import { MenuConfig } from '@/business/models/menu'
import { Role } from '@/constants/role'

const { GUEST, USER, ADMIN } = Role
const getConfig = (): MenuConfig[] => [
    { path: '/', name: 'Dashboard', icon: 'home' },
    { path: '#', name: 'User', icon: 'pizza-slice',
        children: [
            { path: '/user/profile', name: 'Profile', icon: 'pizza-slice' },
            { path: '/user/account', name: 'Account', icon: 'pizza-slice' },
        ],
    },
    { path: '#', name: 'Core', icon: 'address-book',
        children: [
            { path: '/about', name: 'About', icon: 'address-book' },
            { path: '/about/child', name: 'Child', icon: 'address-book', roles: [ADMIN] },
            { path: '/about/other', name: 'Other', icon: 'pizza-slice' },
            { path: '##', name: 'Go Deeper', icon: 'address-book',
                children: [
                    { path: '/about/deeper', name: 'Deeper', icon: 'address-book' },
                    { path: '###', name: 'Go Deepest', icon: 'address-book',
                        children: [
                            { path: '/about/deeper/deepest', name: 'Deepest', icon: 'pizza-slice' },
                        ],
                    },
                ],
            },
            { path: '##', name: 'Go Shallow', icon: 'address-book',
                children: [
                    { path: '/about/shallow', name: 'Shallow', icon: 'address-book' },
                ],
            },
        ],
    },
]

export default getConfig
import { MenuConfig } from '@ms7/common'
import { Role } from '@ms7/auth-providers'

const { ADMIN } = Role
const config: MenuConfig[] = [
    { path: '/', name: 'Home', icon: 'home' },
    { path: '/void', name: 'Void (404)', icon: 'circle-exclamation' },
    { path: '/admin', name: 'Admin (Protected)', icon: 'lock', roles: [ADMIN] },
]

export default config
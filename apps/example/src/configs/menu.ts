import { MenuConfig } from '@ms7/common'
import { Role } from '@ms7/auth-providers'
import i18n from '@/i18n'

const { ADMIN } = Role
const config: MenuConfig[] = [
    { path: '/', name: i18n.t('Home'), icon: 'home' },
    { path: '/void', name: `${i18n.t('Void')} (404)`, icon: 'circle-exclamation' },
    { path: '/admin', name: `${i18n.t('Admin')} (${i18n.t('Protected')})`, icon: 'lock', roles: [ADMIN] },
]

export default config
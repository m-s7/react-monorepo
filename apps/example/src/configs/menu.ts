import { MenuConfig } from '@ms7/common'
import { Role } from '@ms7/auth-providers'
import i18n from '@/i18n'

const { ADMIN } = Role
const config: MenuConfig[] = [
    { path: '/', name: i18n.t('menu.home'), icon: 'home' },
    { path: '/void', name: `${i18n.t('menu.void')}`, icon: 'circle-exclamation' },
    { path: '/admin', name: `${i18n.t('menu.admin-secured')}`, icon: 'lock', roles: [ADMIN] },
]

export default config
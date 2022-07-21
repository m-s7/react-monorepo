import { MenuConfig } from '@ms7/common'
import { Role } from '@ms7/auth-providers'
import i18n from '@/i18n'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'

const config: MenuConfig[] = [
    { path: '/', name: i18n.t('menu.home'), icon: faHome },
    { path: '/void', name: `${i18n.t('menu.void')}`, icon: faCircleExclamation },
    { path: '/admin', name: `${i18n.t('menu.admin-secured')}`, icon: faLock, roles: [Role.ADMIN] },
]

export default config
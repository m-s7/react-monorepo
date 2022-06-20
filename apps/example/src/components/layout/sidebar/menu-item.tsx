import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from '@ms7/bui'
import { RouterLink } from '@ms7/bui'
import { Role } from '@ms7/auth-providers'

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement>, React.AriaAttributes {
    icon?: IconProp,
    path?: string,
    active?: boolean,
    roles?: Role[],
}

const MenuItem = (props: MenuItemProps) => {
    const { children, icon, path = '#', active = false } = props

    return (
        <li className={active ? 'nav-item' : ''}>
            <RouterLink
                to={path}
                disabled={active}
                className={`nav-link ${active ? 'active' : 'text-white'}`}>
                {icon &&
                    <Icon
                        variant={icon}
                        size={'sm'}
                        className={'me-2'} />
                }
                {children}
            </RouterLink>
        </li>
    )
}

export default MenuItem
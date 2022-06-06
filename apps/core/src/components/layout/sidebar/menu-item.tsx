import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '@/components/ui/icon'
import Link from '@/components/router/nav/link'
import { Role } from '@ms7/auth-providers'

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement>, React.AriaAttributes {
    icon: IconProp,
    path?: string,
    active?: boolean,
    roles?: Role[],
}

const MenuItem = (props: MenuItemProps) => {
    const { children, icon, path = '#', active = false } = props

    return (
        <li className={active ? 'nav-item' : ''}>
            <Link
                to={path}
                disabled={active}
                className={`nav-link ${active ? 'active' : 'text-white'}`}>
                <Icon
                    variant={icon}
                    size={'sm'}
                    className={'me-2'} />
                {children}
            </Link>
        </li>
    )
}

export default MenuItem
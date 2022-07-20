import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Link } from '@ms7/ui'
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
            <Link
                to={path}
                disabled={active}
                className={`nav-link ${active ? 'active' : 'text-white'}`}>
                {icon &&
                    <FontAwesomeIcon
                        icon={icon}
                        size="sm"
                        className="me-2" />
                }
                {children}
            </Link>
        </li>
    )
}

export default MenuItem
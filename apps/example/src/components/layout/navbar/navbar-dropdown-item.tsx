import React from 'react'
import { Link } from '@ms7/ui'

interface NavbarDropdownItemProps extends React.HTMLAttributes<HTMLLIElement>, React.AriaAttributes {
    to?: string,
}

const NavbarDropdownItem = (props: NavbarDropdownItemProps) => {
    const { children, to = '#', ...rest } = props

    return (
        <li {...rest}>
            <Link
                to={to}
                className="dropdown-item">
                {children}
            </Link>
        </li>
    )
}

export default NavbarDropdownItem
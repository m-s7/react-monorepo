import React from 'react'
import Link from '@/components/router/nav/link'

interface MenuDropdownItemProps extends React.HTMLAttributes<HTMLLIElement>, React.AriaAttributes {
    path?: string,
}

const FooterDropdownItem = (props: MenuDropdownItemProps) => {
    const { children, path = '#', ...rest } = props

    return (
        <li {...rest}>
            <Link
                to={path}
                className={'dropdown-item'}>
                {children}
            </Link>
        </li>
    )
}

export default FooterDropdownItem
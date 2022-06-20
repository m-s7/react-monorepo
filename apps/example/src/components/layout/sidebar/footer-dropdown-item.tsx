import React from 'react'
import { RouterLink } from '@ms7/bui'

interface MenuDropdownItemProps extends React.HTMLAttributes<HTMLLIElement>, React.AriaAttributes {
    path?: string,
}

const FooterDropdownItem = (props: MenuDropdownItemProps) => {
    const { children, path = '#', ...rest } = props

    return (
        <li {...rest}>
            <RouterLink
                to={path}
                className={'dropdown-item'}>
                {children}
            </RouterLink>
        </li>
    )
}

export default FooterDropdownItem
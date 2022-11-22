import React from 'react'
import { Link } from '@ms7/ui'
import styled from 'styled-components'

interface NavbarDropdownItemProps extends React.HTMLAttributes<HTMLLIElement>, React.AriaAttributes {
    to?: string,
}

const Aaa = styled.li<NavbarDropdownItemProps>`
    display: block;
    width: 100%;
    padding: 0.25rem 1rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    &:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
`

const NavbarDropdownItem = (props: NavbarDropdownItemProps) => {
    const { children, to = '#', ...rest } = props

    return (
        <Aaa {...rest}>
            <Link
                to={to}
                className="text-white">
                {children}
            </Link>
        </Aaa>
    )
}

export default NavbarDropdownItem
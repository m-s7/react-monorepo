import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styled from 'styled-components'

interface RouterLinkProps extends React.AnchorHTMLAttributes<LinkProps & HTMLAnchorElement> {
    to: string,
    variant?: 'default' | 'primary',
    disabled?: boolean,
    className?: string,
}

const Component = styled(Link)<RouterLinkProps>`
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};
    ${props => props.variant === 'primary' ? 'color: #61dafb;' : ''}
`

export const RouterLink = (props: RouterLinkProps) => {
    const { children, to, disabled = false, variant = 'default', className = '' } = props

    return (
        <Component
            to={to}
            variant={variant}
            disabled={disabled}
            className={className}>
            {children}
        </Component>
    )
}

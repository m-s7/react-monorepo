import React from 'react'
import { Link as RouterLink, LinkProps } from 'react-router-dom'
import styled from 'styled-components'

export interface RouterLinkProps extends React.AnchorHTMLAttributes<LinkProps & HTMLAnchorElement> {
    to: string,
    variant?: 'default' | 'primary' | 'secondary' | 'link',
    disabled?: boolean,
    className?: string,
    onClick?: () => void,
}

const StyledLink = styled(RouterLink)<RouterLinkProps>`
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};
    color: var(--text-${props => props.variant});
    text-decoration: none;
    &:hover {
        color: var(--text-${props => props.variant});
    }
`

export const Link = (props: RouterLinkProps) => {
    const { children, to, disabled = false, variant = 'link', className = '', onClick } = props

    return (
        <StyledLink
            to={to}
            variant={variant}
            disabled={disabled}
            className={className}
            onClick={onClick}>
            {children}
        </StyledLink>
    )
}

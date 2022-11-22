import React from 'react'
import { Link } from '../../components/link'

export interface PageLinkProps {
    to?: string,
    linkText?: string,
}

export const PageLink = (props: PageLinkProps) => {
    const { to, linkText } = props

    if(to && linkText)
        return (
            <Link to={to}>
                {linkText}
            </Link>
        )

    return <></>
}

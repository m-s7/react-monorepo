import React from 'react'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardSmallCentered } from '../components/card-small-centered'
import { RouterLink } from '../router-link'

interface NotFound404Props {
    to: string,
    header?: string,
}

export const NotFound404 = (props: React.PropsWithChildren<NotFound404Props>) => {
    const { to, header = '404 - Not Found', children } = props

    return (
        <LayoutEmpty>
            <CardSmallCentered>
                <h2>{header}</h2>
                <RouterLink to={to}>
                    {children}
                </RouterLink>
            </CardSmallCentered>
        </LayoutEmpty>
    )
}

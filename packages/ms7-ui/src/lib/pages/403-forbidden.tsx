import React from 'react'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { Link } from '../components/link'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faBan)

interface Forbidden403Props {
    to: string,
    title?: string,
    header?: string,
}

export const Forbidden403 = (props: React.PropsWithChildren<Forbidden403Props>) => {
    const { to, title = '403 - Forbidden', header, children } = props

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <FontAwesomeIcon
                    icon="ban"
                    size="7x"
                    className="mb-5" />
                <h2>{title}</h2>
                <Link to={to}>
                    {children}
                </Link>
            </CardCentered>
        </LayoutEmpty>
    )
}

import React from 'react'
import { Link } from '../components/link'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faCircleQuestion)

interface NotFound404Props {
    to: string,
    title?: string,
    header?: string,
}

export const NotFound404 = (props: React.PropsWithChildren<NotFound404Props>) => {
    const { to, title = '404 - Not Found', header, children } = props

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <FontAwesomeIcon
                    icon="circle-question"
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

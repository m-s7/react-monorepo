import React from 'react'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { RouterLink } from '../router-link'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '../icon'

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
                <Icon
                    variant={'circle-question'}
                    size={'7x'}
                    className="mb-5" />
                <h2>{title}</h2>
                <RouterLink to={to}>
                    {children}
                </RouterLink>
            </CardCentered>
        </LayoutEmpty>
    )
}

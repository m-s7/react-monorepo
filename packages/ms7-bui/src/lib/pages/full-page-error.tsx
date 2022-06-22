import React from 'react'
import { FatalError } from '@ms7/common'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { RouterLink } from '../router-link'

interface Props {
    error: FatalError | Error,
    header?: string,
    allowNavigation?: boolean,
}

export const FullPageError = (props: Props) => {
    const { error, header, allowNavigation } = props
    const title = (error instanceof FatalError ? `${error.name} - ${error.message}` : error.message)

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <h2>{title}</h2>
                {allowNavigation &&
                    <p>
                        <RouterLink to='/'>
                            {'Index'}
                        </RouterLink>
                    </p>
                }
            </CardCentered>
        </LayoutEmpty>
    )
}

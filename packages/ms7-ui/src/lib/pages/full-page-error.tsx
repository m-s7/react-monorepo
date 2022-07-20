import React from 'react'
import { FatalError } from '@ms7/common'
import { Link } from '../components/link'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'

interface FullPageErrorProps {
    error: FatalError | Error,
    header?: string,
    allowNavigation?: boolean,
}

export const FullPageError = (props: FullPageErrorProps) => {
    const { error, header, allowNavigation } = props
    const title = (error instanceof FatalError ? `${error.name} - ${error.message}` : error.message)

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <h2>{title}</h2>
                {allowNavigation &&
                    <p>
                        <Link to='/'>
                            {'Index'}
                        </Link>
                    </p>
                }
            </CardCentered>
        </LayoutEmpty>
    )
}

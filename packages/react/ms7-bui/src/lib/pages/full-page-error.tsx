import React from 'react'
import { FatalError } from '@ms7/common'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { RouterLink } from '../router-link'

interface Props { error: FatalError | Error, allowNavigation?: boolean }

export const FullPageError = (props: Props) => {
    const { error, allowNavigation } = props
    const title = (error instanceof FatalError ? `${error.name} - ${error.message}` : error.message)

    return (
        <LayoutEmpty>
            <CardCentered>
                <h2>{title}</h2>
                {allowNavigation &&
                    <p>
                        <RouterLink to='/'>
                            {'Dashboard'}
                        </RouterLink>
                    </p>
                }
            </CardCentered>
        </LayoutEmpty>
    )
}

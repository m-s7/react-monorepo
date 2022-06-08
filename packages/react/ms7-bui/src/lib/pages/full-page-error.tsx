import React from 'react'
import { FatalError as FatalErrorInstance } from '@ms7/common'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardSmallCentered } from '../components/card-small-centered'
import { RouterLink } from '../router-link'

interface Props { error: FatalErrorInstance | Error, allowNavigation?: boolean }

export const FullPageError = (props: Props) => {
    const { error, allowNavigation } = props
    const title = (error.name ? `${error.name} - ${error.message}` : error.message)

    return (
        <LayoutEmpty>
            <CardSmallCentered>
                <h2>{title}</h2>
                {allowNavigation &&
                    <p>
                        <RouterLink to='/'>
                            {'Dashboard'}
                        </RouterLink>
                    </p>
                }
            </CardSmallCentered>
        </LayoutEmpty>
    )
}

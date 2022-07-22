import React from 'react'
import { Link } from '../components/link'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'

export interface FullPageFatalErrorProps {
    error: Error,
    header?: string,
    homeLinkName?: string,
}

const StyledLink = styled(Link)`
    text-transform: capitalize;
`

export const FullPageFatalError = ({ error, header, homeLinkName, children }: React.PropsWithChildren<FullPageFatalErrorProps>) => {
    if(error)
        return (
            <LayoutEmpty>
                <CardCentered header={header}>
                    <FontAwesomeIcon
                        icon={faBomb}
                        size="7x"
                        className="mb-5" />
                    <h3>{error.message}</h3>
                    <pre>Refresh page to try again</pre>
                    {homeLinkName &&
                        <span>
                            <StyledLink to="/">{homeLinkName}</StyledLink>
                        </span>
                    }
                </CardCentered>
            </LayoutEmpty>
        )

    return (<>{children}</>)
}

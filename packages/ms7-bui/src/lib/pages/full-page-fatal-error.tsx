import React from 'react'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import styled from 'styled-components'

export interface FullPageFatalErrorProps {
    error: Error,
    header?: string,
    homeLinkName?: string,
}

const Link = styled.a`
    text-transform:capitalize;
`

export const FullPageFatalError = ({ error, header, homeLinkName, children }: React.PropsWithChildren<FullPageFatalErrorProps>) => {
    if(error)
        return (
            <LayoutEmpty>
                <CardCentered header={header}>
                    <h3>{error.message}</h3>
                    <pre>Refresh page to try again</pre>
                    {homeLinkName &&
                        <span>
                            <Link href="/">{homeLinkName}</Link>
                        </span>
                    }
                </CardCentered>
            </LayoutEmpty>
        )

    return (<>{children}</>)
}

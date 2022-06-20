import React from 'react'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import styled from 'styled-components'

export interface FullPageFatalErrorProps {
    error: Error,
    home_link_name?: string,
}

const Link = styled.a`
    text-transform:capitalize;
`

export const FullPageFatalError = ({ error, home_link_name, children }: React.PropsWithChildren<FullPageFatalErrorProps>) => {
    if(error)
        return (
            <LayoutEmpty>
                <CardCentered header={process.env.REACT_APP_NAME}>
                    <h3>{error.message}</h3>
                    <pre>Refresh page to try again</pre>
                    {home_link_name &&
                        <span>
                            <Link href="/">{home_link_name}</Link>
                        </span>
                    }
                </CardCentered>
            </LayoutEmpty>
        )

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

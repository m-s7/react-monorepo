import React from 'react'
import styled from 'styled-components'
import { Card as BootstrapCard } from 'react-bootstrap'

interface CardCenteredProps extends React.HTMLAttributes<HTMLDivElement>, React.AriaAttributes {
    header?: React.ReactNode | React.ReactNode[],
}

const StyledCardCentered = styled(BootstrapCard)`
    color: #ffffff;
    background-color: #343a40 !important;
    border: 0 !important;
    margin: auto;
    height: 450px;
`

const StyledCardCenteredBody = styled(BootstrapCard.Body)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 20px 20px;
    min-width: 450px;
`

export const CardCentered = (props: CardCenteredProps) => {
    const { header, className, children, ...rest } = props

    return (
        <StyledCardCentered
            className={`${className} background-darker text-center`}
            {...rest}>
            {header && <BootstrapCard.Header>{header}</BootstrapCard.Header>}
            <StyledCardCenteredBody>
                {children}
            </StyledCardCenteredBody>
        </StyledCardCentered>
    )
}

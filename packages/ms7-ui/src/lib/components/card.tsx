import React from 'react'
import { Card as BootstrapCard } from 'react-bootstrap'
import '../css/common.css'

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, React.AriaAttributes {
    header?: React.ReactNode | React.ReactNode[],
}

export const Card = (props: CardProps) => {
    const { children, className = '', header, ...rest } = props

    return (
        <BootstrapCard
            className={`${className} background-darker`}
            {...rest}>
            {header && <BootstrapCard.Header>{header}</BootstrapCard.Header>}
            <BootstrapCard.Body>
                {children}
            </BootstrapCard.Body>
        </BootstrapCard>
    )
}

import React from 'react'
import styled from 'styled-components'

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, React.AriaAttributes {
    header?: React.ReactNode | React.ReactNode[],
    fillViewport?: boolean,
}

const Component = styled.div`
    background-color: #343a40 !important;
    border: 0 !important;
`

export const Card = (props: CardProps) => {
    const { children, className, header, fillViewport, ...rest } = props

    return (
        <Component
            className={`card ${fillViewport ? 'h-100 w-100' : ''} ${className}`}
            {...rest}>
            {header && <div className={'card-header'}>{header}</div>}
            <div className={'card-body'}>
                {children}
            </div>
        </Component>
    )
}

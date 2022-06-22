import React from 'react'
import styled from 'styled-components'

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, React.AriaAttributes {
    header?: React.ReactNode | React.ReactNode[],
}

const Component = styled.div`
    background-color: #343a40 !important;
    border: 0 !important;
`

export const Card = (props: CardProps) => {
    const { children, className, header, ...rest } = props

    return (
        <Component
            className={className ? `card ${className}` : 'card'}
            {...rest}>
            {header && <div className={'card-header'}>{header}</div>}
            <div className={'card-body'}>
                {children}
            </div>
        </Component>
    )
}

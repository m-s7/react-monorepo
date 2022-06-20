import React from 'react'
import styled from 'styled-components'

interface CardSmallCenteredProps extends React.HTMLAttributes<HTMLElement> {
    header?: string,
    //min-width, height,
}

const Component = styled.div`
    color: #ffffff;
    background-color: #343a40 !important;
    border: 0 !important;
    margin: auto;
    height: 450px;
`

const ComponentBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 20px 20px;
    min-width: 450px;
`

export const CardCentered = (props: CardSmallCenteredProps) => {
    const { header, className, children } = props

    return (
        <Component className={className ? `card ${className}` : 'card'}>
            <div className={'card-header text-center'}>{header ?? header}</div>
            <ComponentBody className={'card-body'}>
                {children}
            </ComponentBody>
        </Component>
    )
}

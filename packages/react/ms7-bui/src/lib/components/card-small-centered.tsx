import React from 'react'
import styled from 'styled-components'

interface CardSmallCenteredProps extends React.HTMLAttributes<HTMLElement>, React.AriaAttributes {
    fullSpace?: boolean,
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
    min-width: 430px;
`

export const CardSmallCentered = (props: CardSmallCenteredProps) => {
    const { children } = props

    return (
        <Component className={'card'}>
            <div className={'card-header text-center'}>{'react-core'}</div>
            <ComponentBody className={'card-body'}>
                {children}
            </ComponentBody>
        </Component>
    )
}

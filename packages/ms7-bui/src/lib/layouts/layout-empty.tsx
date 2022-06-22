import React from 'react'
import styled from 'styled-components'

interface LayoutProps {
    children?: React.ReactNode | React.ReactNode[],
}

const Component = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    background-color: #454d55;
`

const ComponentRow = styled.div`
    margin: auto;
`

export const LayoutEmpty = (props: LayoutProps) => {
    const { children } = props

    return (
        <Component>
            <ComponentRow>
                {children && <div>{children}</div>}
            </ComponentRow>
        </Component>
    )
}

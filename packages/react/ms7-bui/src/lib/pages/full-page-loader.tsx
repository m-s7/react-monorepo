import React from 'react'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardSmallCentered } from '../components/card-small-centered'
import { RouterLink } from '../router-link'
import styled, { keyframes } from 'styled-components'

interface Props {
    navigateName?: string,
    navigatePath?: string,
}

const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Component = styled.div`
    border: 18px solid #f3f3f3;
    border-top: 18px solid #3498db;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    margin-bottom: 10px;
    animation: ${rotate} 1s linear infinite;
`

export const FullPageLoader = (props: Props) => {
    const { navigateName, navigatePath } = props

    return (
        <LayoutEmpty>
            <CardSmallCentered>
                <Component />
                <span>{'Please wait...'}</span>
                {(navigateName && navigatePath) &&
                    <RouterLink to={navigatePath}>
                        {navigateName}
                    </RouterLink>
                }
            </CardSmallCentered>
        </LayoutEmpty>
    )
}

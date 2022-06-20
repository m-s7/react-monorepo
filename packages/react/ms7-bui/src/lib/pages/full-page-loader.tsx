import React from 'react'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { RouterLink } from '../router-link'
import styled from 'styled-components'

interface Props {
    header?: string,
    navigateName?: string,
    navigatePath?: string,
}

const Component = styled.div`
    border: 18px solid #f3f3f3;
    border-top: 18px solid #3498db;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    margin-bottom: 10px;
    animation: rotate 1s linear infinite;
    
    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }    
    }
`

export const FullPageLoader = (props: Props) => {
    const { header, navigateName, navigatePath } = props

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <Component />
                <span>{'Please wait...'}</span>
                {(navigateName && navigatePath) &&
                    <RouterLink to={navigatePath}>
                        {navigateName}
                    </RouterLink>
                }
            </CardCentered>
        </LayoutEmpty>
    )
}

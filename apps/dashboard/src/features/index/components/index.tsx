import React from 'react'
import logo from '@/assets/logo.svg'
import { Card } from '@ms7/ui'
import styled from 'styled-components'
import { env } from '@ms7/common'
import { useTranslation } from 'react-i18next'

const Logo = styled.img`
    height: 20vw;
    
    @media (prefers-reduced-motion: no-preference) {
        animation: rotate infinite 20s linear;
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
}
`

export const Index = () => {
    const { t } = useTranslation()

    return (
        <div className="d-flex justify-content-center">
            <Card>
                <div className="d-flex flex-column align-items-center">
                    <h1>{env.REACT_APP_NAME}</h1>
                    <pre>{t('index.label')}</pre>
                    <Logo
                        src={logo}
                        alt="logo" />
                </div>
            </Card>
        </div>
    )
}

export default Index

import React from 'react'
import logo from '@/assets/logo.svg'
import { Card } from '@ms7/bui'
import styled from 'styled-components'

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

const Index = () => (
    <div className="d-flex justify-content-center">
        <Card>
            <div className="d-flex flex-column align-items-center">
                <h1>{'MS7 Core'}</h1>
                <Logo
                    src={logo}
                    alt="logo" />
            </div>
        </Card>
    </div>
)

export default Index

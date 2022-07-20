import React from 'react'
import styled from 'styled-components'

interface SpinnerProps {
    size?: number,
}

const StyledSpinner = styled.div<SpinnerProps>`
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: ${props => props.security || 20}px;
    height: ${props => props.security || 20}px;
    animation: rotate 1s linear infinite;

    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }    
    }
`

export const Spinner = (props: SpinnerProps) => (<StyledSpinner size={props.size} />)

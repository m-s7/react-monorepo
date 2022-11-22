import React from 'react'
import styled from 'styled-components'

interface SpinnerProps {
    size?: number,
    className?: string,
}

const StyledSpinner = styled.div<SpinnerProps>`
    border: ${props => getBorderSize(props.size)}px solid #f3f3f3;
    border-top: ${props => getBorderSize(props.size)}px solid #3498db;
    border-radius: 50%;
    width: ${props => props.size || 20}px;
    height: ${props => props.size || 20}px;
    animation: rotate 1s linear infinite;

    @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }    
    }
`

export const Spinner = (props: SpinnerProps) => {
    const { size, className } = props

    return (
        <StyledSpinner
            size={size}
            className={className || ''} />
    )
}

const getBorderSize = (size?: number): number => ((size || 20 ) / 10)
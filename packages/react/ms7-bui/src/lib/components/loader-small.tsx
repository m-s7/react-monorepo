import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Component = styled.div`
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: ${rotate} 1s linear infinite;
`

export const LoaderSmall = () => (<Component />)

import React from 'react'
import styled from 'styled-components'

const Loader = styled.div`
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

const CenteredLoader = ({ text }: { text?: string }) => (
    <div className="d-flex flex-column align-items-center m-3">
        <Loader />
        <span>{text ?? ''}</span>
    </div>
)

export default CenteredLoader
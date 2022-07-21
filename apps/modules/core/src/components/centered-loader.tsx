import React from 'react'
import { Spinner } from '@ms7/ui'

const CenteredLoader = ({ text }: { text?: string }) => (
    <div className="d-flex flex-column align-items-center m-3">
        <Spinner
            size={150}
            className="mb-3" />
        <span>{text ?? ''}</span>
    </div>
)

export default CenteredLoader
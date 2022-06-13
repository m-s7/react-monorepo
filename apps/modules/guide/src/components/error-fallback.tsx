import React from 'react'
import { Button } from '@ms7/bui'

interface Fallback {
    error: Error,
    resetErrorBoundary: () => void,
}

const ErrorFallback = ({ error, resetErrorBoundary }: Fallback) => (
    <div>
        <p className="text-warning">Something went wrong:</p>
        <ul>
            <li>
                <pre>{error.message}</pre>
            </li>
        </ul>
        <Button
            className="btn-sm ms-3"
            onClick={resetErrorBoundary}>
            Try again
        </Button>
    </div>
)

export default ErrorFallback
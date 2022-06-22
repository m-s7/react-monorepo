import React from 'react'
import { Button } from '../button'
import { LayoutEmpty } from '../layouts/layout-empty'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    error: Error,
    resetErrorBoundary: () => void,
    allowRetry?: boolean,
}

export const ErrorBoundaryFallback = ({ error, resetErrorBoundary, children }: Props) => {
    if(error)
        return (
            <LayoutEmpty>
                <div className="d-flex flex-column align-items-center">
                    <div className="text-warning mb-2">Something went wrong:</div>
                    <div
                        className="alert alert-danger"
                        role="alert">
                        {error?.message}
                    </div>
                    <Button
                        className="ms-3"
                        onClick={resetErrorBoundary}>
                    Try again
                    </Button>
                </div>
            </LayoutEmpty>
        )

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

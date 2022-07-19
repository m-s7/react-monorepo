import React, { PropsWithChildren } from 'react'
import { Button } from '@ms7/bui'
import { Card } from '@ms7/bui'

interface ErrorFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
    error: Error | null | undefined,
    onRetry?: () => void,
}

const ErrorFallback = (props: PropsWithChildren<ErrorFallbackProps>) => {
    const { error, onRetry, children, className = '' } = props

    if(error)
        return (
            <div className={className}>
                <Card>
                    <div className="d-flex flex-column align-items-center">
                        <div className="text-warning mb-2">Something went wrong:</div>
                        <div
                            className="alert alert-danger"
                            role="alert">
                            {error?.message}
                        </div>
                        {onRetry &&
                            <Button
                                className="ms-3"
                                onClick={() => {
                                    onRetry()
                                }}>
                                Try again
                            </Button>
                        }
                    </div>
                </Card>
            </div>
        )

    return (<>{children}</>)
}

export default ErrorFallback
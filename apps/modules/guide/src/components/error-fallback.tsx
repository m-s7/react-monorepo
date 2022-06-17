import React, { PropsWithChildren } from 'react'
import { Button } from '@ms7/bui'
import { Card } from '@ms7/bui'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    error: Error | undefined,
    onRetry?: () => void,
}

const ErrorFallback = (props: PropsWithChildren<Props>) => {
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

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default ErrorFallback
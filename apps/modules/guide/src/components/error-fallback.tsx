import React, { PropsWithChildren } from 'react'
import { Button } from '@ms7/bui'

interface Props {
    error: Error | undefined,
    onRetry?: () => void,
}

const ErrorFallback = (props: PropsWithChildren<Props>) => {
    const { error, onRetry, children } = props

    if(error)
        return (
            <div>
                <p className="text-warning">Something went wrong:</p>
                <ul>
                    <li>
                        <pre>{error.message}</pre>
                    </li>
                </ul>
                {onRetry &&
                <Button
                    className="btn-sm ms-3"
                    onClick={() => onRetry()}>
                    Try again
                </Button>
                }
            </div>
        )

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default ErrorFallback
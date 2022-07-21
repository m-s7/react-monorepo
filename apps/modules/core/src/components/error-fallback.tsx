import React, { PropsWithChildren } from 'react'
import Button from 'react-bootstrap/Button'
import { CardCentered } from '@ms7/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons/faBomb'

interface ErrorFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
    error: Error | null | undefined,
    onRetry?: () => void,
}

const ErrorFallback = (props: PropsWithChildren<ErrorFallbackProps>) => {
    const { error, onRetry, children, className = '' } = props

    if(error)
        return (
            <div className={className}>
                <CardCentered>
                    <FontAwesomeIcon
                        icon={faBomb}
                        size="7x"
                        className="mb-5" />
                    <pre>Something went wrong</pre>
                    <pre
                        className="alert alert-danger"
                        role="alert">
                        {error?.message}
                    </pre>
                    {onRetry &&
                    <Button
                        className="mt-3"
                        onClick={() => {
                            onRetry()
                        }}>
                        Try again
                    </Button>
                    }
                </CardCentered>
            </div>
        )

    return (<>{children}</>)
}

export default ErrorFallback
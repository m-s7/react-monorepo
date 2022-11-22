import React, { PropsWithChildren } from 'react'
import { Button } from 'react-bootstrap'
import { CardCentered } from './card-centered'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons/faBomb'
import { useTranslation } from 'react-i18next'

interface ErrorFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
    error: Error | null | undefined,
    onRetry?: () => void,
}

export const ErrorFallback = (props: PropsWithChildren<ErrorFallbackProps>) => {
    const { t } = useTranslation()
    const { error, onRetry, children, className = '' } = props

    if(error)
        return (
            <div className={className}>
                <CardCentered>
                    <FontAwesomeIcon
                        icon={faBomb}
                        size="7x"
                        className="mb-5" />
                    <pre>{t('error.something-went-wrong')}</pre>
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
                        {t('common.try-again')}
                    </Button>
                    }
                </CardCentered>
            </div>
        )

    return (<>{children}</>)
}

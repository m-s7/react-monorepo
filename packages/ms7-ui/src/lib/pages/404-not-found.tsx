import React from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorComponent } from './types'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { PageError } from './common/page-error'

export const NotFound404 = (props: ErrorComponent) => {
    const { t } = useTranslation()

    return (
        <PageError
            icon={faCircleQuestion}
            text={t('error.not-found')}
            {...props} />
    )
}

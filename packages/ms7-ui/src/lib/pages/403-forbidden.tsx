import React from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorComponent } from './types'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { PageError } from './common/page-error'

export const Forbidden403 = (props: ErrorComponent) => {
    const { t } = useTranslation()

    return (
        <PageError
            icon={faBan}
            text={t('error.forbidden')}
            {...props} />
    )
}

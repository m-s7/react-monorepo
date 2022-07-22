import React from 'react'
import { ErrorComponent } from './types'
import { faBomb } from '@fortawesome/free-solid-svg-icons'
import { PageError } from './common/page-error'

interface FullPageErrorProps {
    error: Error,
}

export const FullPageError = (props: ErrorComponent & FullPageErrorProps) => (
    <PageError
        icon={faBomb}
        text={props.error.message}
        {...props} />
)

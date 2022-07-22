import React from 'react'
import { Spinner } from '../components/spinner'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { useTranslation } from 'react-i18next'
import { env } from '@ms7/common'
import { PageLink, PageLinkProps } from './common/page-link'

interface FullPageLoaderProps extends PageLinkProps {
    header?: string,
    useDefaults?: never,
}

interface FullPageLoaderDefaultProps extends PageLinkProps {
    header?: never,
    useDefaults?: boolean,
}

export const FullPageSpinner = (props: React.PropsWithChildren<FullPageLoaderProps | FullPageLoaderDefaultProps>) => {
    const { t } = useTranslation()
    const { to, linkText, useDefaults, children = t('common.please-wait') } = props

    const header = (useDefaults ? env.REACT_APP_NAME : props.header)

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <Spinner
                    size={150}
                    className="mb-2" />
                <span>{children}</span>
                <PageLink
                    to={to}
                    linkText={linkText} />
            </CardCentered>
        </LayoutEmpty>
    )
}

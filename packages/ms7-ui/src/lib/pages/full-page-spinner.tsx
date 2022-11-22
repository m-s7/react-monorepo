import React from 'react'
import { Spinner } from '../components/spinner'
import { CardCentered } from '../components/card-centered'
import { useTranslation } from 'react-i18next'
import { env } from '@ms7/common'
import { PageLink, PageLinkProps } from './common/page-link'
import { CenteredEmptyLayout } from '../layouts/centered-empty-layout'

interface FullPageLoaderProps extends PageLinkProps {
    header?: string,
    layout?: React.ElementType,
    useDefaults?: never,
}

interface FullPageLoaderDefaultProps extends PageLinkProps {
    header?: never,
    layout?: React.ElementType,
    useDefaults?: true,
}

export const FullPageSpinner = (props: React.PropsWithChildren<FullPageLoaderProps | FullPageLoaderDefaultProps>) => {
    const { t } = useTranslation()
    const { to, linkText, useDefaults, layout: Layout = CenteredEmptyLayout, children = t('common.please-wait') } = props

    const header = (useDefaults ? env.REACT_APP_NAME : props.header)

    return (
        <Layout>
            <CardCentered header={header}>
                <Spinner
                    size={150}
                    className="mb-2" />
                <span>{children}</span>
                <PageLink
                    to={to}
                    linkText={linkText} />
            </CardCentered>
        </Layout>
    )
}

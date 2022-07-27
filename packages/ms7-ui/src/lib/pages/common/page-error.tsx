import React from 'react'
import { CardCentered } from '../../components/card-centered'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { env } from '@ms7/common'
import { capitalize } from 'lodash'
import { PageLink, PageLinkProps } from './page-link'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { CenteredEmptyLayout } from '../../layouts/centered-empty-layout'

export interface PageErrorProps extends PageLinkProps {
    text: string,
    icon: IconProp,
    header?: string,
    layout?: React.ElementType,
    useDefaults?: never,
}

export interface PageErrorDefaultProps extends PageLinkProps {
    text: string,
    icon: IconProp,
    header?: never,
    layout?: React.ElementType,
    useDefaults: true,
}

export const PageError = (props: PageErrorProps | PageErrorDefaultProps) => {
    const { t } = useTranslation()
    const { text, icon, useDefaults, layout: Layout = CenteredEmptyLayout  } = props

    const to = (useDefaults ? '/' : (props.to || '/'))
    const header = (useDefaults ? env.REACT_APP_NAME : props.header)
    const linkText = (useDefaults ? capitalize(t(env.REACT_APP_HOMEPAGE_NAME)) : props.linkText)

    return (
        <Layout>
            <CardCentered header={header}>
                <FontAwesomeIcon
                    icon={icon}
                    size="7x"
                    className="mb-5" />
                <h2>{text}</h2>
                <PageLink
                    to={to}
                    linkText={linkText} />
            </CardCentered>
        </Layout>

    )    
}

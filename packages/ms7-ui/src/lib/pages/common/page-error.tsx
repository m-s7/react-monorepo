import React from 'react'
import { LayoutEmpty } from '../../layouts/layout-empty'
import { CardCentered } from '../../components/card-centered'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { env } from '@ms7/common'
import { capitalize } from 'lodash'
import { PageLink, PageLinkProps } from './page-link'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface PageErrorProps extends PageLinkProps {
    text: string,
    icon: IconProp,
    header?: string,
    useDefaults?: never,
}

export interface PageErrorDefaultProps extends PageLinkProps {
    text: string,
    icon: IconProp,
    header?: never,
    useDefaults: boolean,
}

export const PageError = (props: PageErrorProps | PageErrorDefaultProps) => {
    const { t } = useTranslation()
    const { text, icon, useDefaults } = props

    const to = (useDefaults ? '/' : (props.to || '/'))
    const header = (useDefaults ? env.REACT_APP_NAME : props.header)
    const linkText = (useDefaults ? capitalize(t(env.REACT_APP_HOMEPAGE_NAME)) : props.linkText)

    return (
        <LayoutEmpty>
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
        </LayoutEmpty>

    )    
}

import React from 'react'
import { env } from '@ms7/common'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { Link } from '../components/link'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { capitalize } from 'lodash'
import { useTranslation } from 'react-i18next'

interface Forbidden403Props extends React.PropsWithChildren {
    to: string,
    title?: string,
    header?: string,
    useDefaults?: never,
}

interface Forbidden403DefaultProps {
    to?: never,
    title?: never,
    header?: never,
    children?: never,
    useDefaults?: boolean,
}

export const Forbidden403 = (props: Forbidden403Props | Forbidden403DefaultProps) => {
    const { t } = useTranslation()
    const { useDefaults } = props

    const to = (useDefaults ? '/' : (props.to || '/'))
    const title = (useDefaults ? t('error.forbidden') : props.title)
    const header = (useDefaults ? env.REACT_APP_NAME : props.header)
    const children = (useDefaults ? capitalize(t(env.REACT_APP_HOMEPAGE_NAME)) : props.children)
    
    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <FontAwesomeIcon
                    icon={faBan}
                    size="7x"
                    className="mb-5" />
                <h2>{title}</h2>
                <Link to={to}>
                    {children}
                </Link>
            </CardCentered>
        </LayoutEmpty>
    )
}

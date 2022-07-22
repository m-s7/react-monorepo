import React from 'react'
import { Link } from '../components/link'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { env } from '@ms7/common'
import { capitalize } from 'lodash'
import { useTranslation } from 'react-i18next'

interface NotFound404Props extends React.PropsWithChildren {
    to: string,
    title?: string,
    header?: string,
    useDefaults?: never,
}

interface NotFound404DefaultProps {
    to?: never,
    title?: never,
    header?: never,
    children?: never,
    useDefaults?: boolean,
}

export const NotFound404 = (props: NotFound404Props | NotFound404DefaultProps) => {
    const { t } = useTranslation()
    const { useDefaults } = props

    const to = (useDefaults ? '/' : (props.to || '/'))
    const title = (useDefaults ? t('error.not-found') : props.title)
    const header = (useDefaults ? env.REACT_APP_NAME : props.header)
    const children = (useDefaults ? capitalize(t(env.REACT_APP_HOMEPAGE_NAME)) : props.children)

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <FontAwesomeIcon
                    icon={faCircleQuestion}
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

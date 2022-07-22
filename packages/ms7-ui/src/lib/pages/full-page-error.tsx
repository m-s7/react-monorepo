import React from 'react'
import { Link } from '../components/link'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'
import { env } from '@ms7/common'
import { capitalize } from 'lodash'
import { useTranslation } from 'react-i18next'

export interface FullPageErrorProps {
    error: Error,
    header?: string,
    navigatePath?: string,
    navigateName?: string,
    useDefaults?: never,
}

export interface FullPageErrorDefaultProps {
    error: Error,
    header?: never,
    navigatePath?: never,
    navigateName?: never,
    useDefaults?: boolean,
}

export const FullPageError = (props: FullPageErrorProps | FullPageErrorDefaultProps) => {
    const { t } = useTranslation()
    const { error, useDefaults } = props

    const header = (useDefaults ? env.REACT_APP_NAME : props.header)
    const navigatePath = (useDefaults ? '/' : props.navigatePath)
    const navigateName = (useDefaults ? capitalize(t(env.REACT_APP_HOMEPAGE_NAME)) : props.navigateName)

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <FontAwesomeIcon
                    icon={faBomb}
                    size="7x"
                    className="mb-5" />
                <h3>{error.message}</h3>
                {(navigateName && navigatePath) &&
                    <Link to={navigatePath}>
                        {navigateName}
                    </Link>
                }
            </CardCentered>
        </LayoutEmpty>
    )
}

import React from 'react'
import { Link } from '../components/link'
import { Spinner } from '../components/spinner'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'
import { useTranslation } from 'react-i18next'
import { env } from '@ms7/common'
import { capitalize } from 'lodash'

interface FullPageLoaderProps {
    header?: string,
    navigateName?: string,
    navigatePath?: string,
    useDefaults?: never,
}

interface FullPageLoaderDefaultProps {
    header?: never,
    navigateName?: never,
    navigatePath?: never,
    useDefaults?: boolean,
}

export const FullPageSpinner = (props: React.PropsWithChildren<FullPageLoaderProps | FullPageLoaderDefaultProps>) => {
    const { t } = useTranslation()
    const { useDefaults, children = t('common.please-wait')} = props

    const header = (useDefaults ? env.REACT_APP_NAME : props.header)
    const navigatePath = (useDefaults ? '/' : props.navigatePath)
    const navigateName = (useDefaults ? capitalize(t(env.REACT_APP_HOMEPAGE_NAME)) : props.navigateName)

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <Spinner
                    size={150}
                    className="mb-2" />
                <span>{children}</span>
                {(navigateName && navigatePath) &&
                    <Link to={navigatePath}>
                        {navigateName}
                    </Link>
                }
            </CardCentered>
        </LayoutEmpty>
    )
}

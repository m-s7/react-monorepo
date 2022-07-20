import React from 'react'
import { env } from '@ms7/common'
import { getConfigRouter } from 'Map/configs/app'
import { Route, Routes } from 'react-router-dom'
import {Forbidden403, NotFound404} from '@ms7/ui'
import { capitalize } from 'lodash'
import { useTranslation } from 'react-i18next'
import { EntrypointComponentProps, RouterGenerator } from '@ms7/router'

const AppRouter = (props: EntrypointComponentProps) => {
    const { t } = useTranslation()
    const { routes } = getConfigRouter()

    const Component404 = (
        <NotFound404
            to={'/'}
            title={t('error.not-found')}
            header={env.REACT_APP_NAME}>
            {capitalize(t(env.REACT_APP_HOMEPAGE_NAME))}
        </NotFound404> )

    const Forbidden = (
        <Forbidden403
            to={'/'}
            title={t('error.not-found')}
            header={env.REACT_APP_NAME}>
            {capitalize(t(env.REACT_APP_HOMEPAGE_NAME))}
        </Forbidden403>
    )

    return (
        <>
            <Routes>
                {RouterGenerator(routes, Forbidden, props.parentLayout)}
                <Route
                    path={'*'}
                    element={Component404} />
            </Routes>
        </>
    )
}

export default AppRouter
// noinspection DuplicatedCode

import React from 'react'
import { getConfigRouter } from 'Guide/configs/app'
import { Route, Routes } from 'react-router-dom'
import { EntrypointComponentProps, RouterGenerator } from '@ms7/router'
import { NotFound404 } from '@ms7/bui'
import { env } from '@ms7/common'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'lodash'

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

    return (
        <React.Fragment>
            <Routes>
                {RouterGenerator(routes, Component404, props.parentLayout)}
                <Route
                    path={'*'}
                    element={Component404} />
            </Routes>
        </React.Fragment>
    )
}

export default AppRouter
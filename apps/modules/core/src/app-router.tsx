// noinspection DuplicatedCode

import React from 'react'
import { getConfigRouter } from 'Core/configs/app'
import { Route, Routes } from 'react-router-dom'
import { EntrypointComponentProps, RouterGenerator } from '@ms7/router'
import { NotFound404, Forbidden403 } from '@ms7/bui'
import { env } from '@ms7/common'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'lodash'

const AppRouter = (props: EntrypointComponentProps) => {
    const { t } = useTranslation()
    const { routes } = getConfigRouter()

    const NotFound = (
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
        <React.Fragment>
            <Routes>
                {RouterGenerator(routes, Forbidden, props.parentLayout)}
                <Route
                    path={'*'}
                    element={NotFound} />
            </Routes>
        </React.Fragment>
    )
}

export default AppRouter
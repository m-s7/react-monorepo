import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RouterGenerator } from '@ms7/router'
import { Forbidden403, NotFound404 } from '@ms7/bui'
import { getRoutes } from '@ms7/router'
import { getAppsEntrypointsConfigs } from '@/utils/apps-utils'
import Layout from '@/layouts/layout'
import { getConfigRouter } from '@/configs/app'
import { capitalize } from 'lodash'
import { env } from '@ms7/common'
import { useTranslation } from 'react-i18next'

const AppRouter = () => {
    const { t } = useTranslation()
    const routes = getRoutes([{ router: getConfigRouter() }])
    const entrypoints = getAppsEntrypointsConfigs()

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
            title={t('error.forbidden')}
            header={env.REACT_APP_NAME}>
            {capitalize(t(env.REACT_APP_HOMEPAGE_NAME))}
        </Forbidden403>
    )

    return (
        <Routes>
            {RouterGenerator(routes, Forbidden, Layout)}
            {entrypoints.map(({ baseUrl, component }, index) => {
                const Component = component

                return (
                    <Route
                        key={`app-entrypoint-${index}`}
                        path={baseUrl}
                        element={
                            <Component
                                parentLayout={Layout} />
                        } />
                )
            })}
            <Route
                path={'*'}
                element={NotFound} />
        </Routes>
    )
}

export default AppRouter
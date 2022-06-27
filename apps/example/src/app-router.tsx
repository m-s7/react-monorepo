import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RouterGenerator } from '@ms7/router'
import { Card, NotFound404 } from '@ms7/bui'
import { getRoutes } from '@ms7/router'
import { getAppsEntrypointsConfigs } from '@/utils/apps-utils'
import Layout from '@/layouts/layout'
import { getConfigRouter } from '@/configs/app'
import layout from '@/layouts/layout'
import { capitalize } from 'lodash'
import { env } from '@ms7/common'
import { useTranslation } from 'react-i18next'
import { FullPageLoader } from '@ms7/bui'

const AppRouter = () => {
    const { t } = useTranslation()
    const routes = getRoutes([{ router: getConfigRouter() }])
    const entrypoints = getAppsEntrypointsConfigs()

    const Component404 = (
        <NotFound404
            to={'/'}
            title={t('error.not-found')}
            header={env.REACT_APP_NAME}>
            {capitalize(t(env.REACT_APP_HOMEPAGE_NAME))}
        </NotFound404> )
    
    return (
        <Routes>
            {RouterGenerator(routes, Component404, Layout)}
            {entrypoints.map(({ baseUrl, component }, index) => {
                const Component = component

                return (
                    <Route
                        key={`app-entrypoint-${index}`}
                        path={baseUrl}
                        element={
                            <Suspense fallback={<FullPageLoader header={env.REACT_APP_NAME} />}>
                                <Component
                                    parentLayout={layout} />
                            </Suspense>
                        } />
                )
            })}
            <Route
                path={'*'}
                element={Component404} />
        </Routes>
    )
}

export default AppRouter
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RouterGenerator } from '@ms7/router'
import { Forbidden403, NotFound404 } from '@ms7/ui'
import { getRoutes } from '@ms7/router'
import { getAppsEntrypointsConfigs } from '@/utils/apps-utils'
import Layout from '@/layouts/layout'
import { getConfigRouter } from '@/configs/app'

const AppRouter = () => {
    const routes = getRoutes([{ router: getConfigRouter() }])
    const entrypoints = getAppsEntrypointsConfigs()

    return (
        <Routes>
            {RouterGenerator(routes, (<Forbidden403 useDefaults />), Layout)}
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
                path="*"
                element={<NotFound404 useDefaults />} />
        </Routes>
    )
}

export default AppRouter
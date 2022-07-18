import React from 'react'
import { Route as RouterRoute } from 'react-router-dom'
import ProtectedRoute from './protected-route'
import { Route } from './types'

export const RouterGenerator = (routes: Route[], forbidden: JSX.Element, parentLayout?: React.ElementType): JSX.Element[] => routes.map(({ path, roles, component, layout, children }, idx) => {
    const Layout = layout || parentLayout || React.Fragment
    const Component = component
    const Protected = (
        <ProtectedRoute
            roles={roles}
            forbidden={forbidden}>
            <Layout>
                <Component />
            </Layout>
        </ProtectedRoute>
    )

    if(children) {
        return (
            <RouterRoute
                key={`idx-${path}-${idx}`}
                path={path}
                element={
                    <Layout>
                        <Component />
                    </Layout>
                }>
                {RouterGenerator(children, forbidden)}
            </RouterRoute>
        )
    }
    else {
        // if(index)
        //     return (
        //         <Route
        //             key={`idx-${path}-${idx}`}
        //             index
        //             element={Protected} />
        //     )
        // else
        return (
            <RouterRoute
                key={`idx-${path}-${idx}`}
                path={path}
                element={Protected} />
        )
    }
})

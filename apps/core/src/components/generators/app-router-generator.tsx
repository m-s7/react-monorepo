import React from 'react'
import { RouteConfig } from '@/business/models/router'
import { Route } from 'react-router-dom'
import ProtectedRoute from '@/components/router/protected-route'

const AppRouterGenerator = (routes: RouteConfig[]): JSX.Element[] => routes.map(({ path, index, roles, component, children }, idx) => {
    const Component = component
    const Protected = (
        <ProtectedRoute roles={roles}>
            <Component />
        </ProtectedRoute>
    )

    if(children) {
        return (
            <Route
                key={`idx-${path}-${idx}`}
                path={path}
                element={<Component />}>
                {AppRouterGenerator(children)}
            </Route>
        )
    }
    else {
        if(index)
            return (
                <Route
                    key={`idx-${path}-${idx}`}
                    index
                    element={Protected} />
            )
        else
            return (
                <Route
                    key={`idx-${path}-${idx}`}
                    path={path}
                    element={Protected} />
            )
    }
})

export default AppRouterGenerator

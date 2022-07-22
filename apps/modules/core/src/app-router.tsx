// noinspection DuplicatedCode

import React from 'react'
import { getConfigRouter } from 'Core/configs/app'
import { Route, Routes } from 'react-router-dom'
import { EntrypointComponentProps, RouterGenerator } from '@ms7/router'
import { Forbidden403, NotFound404 } from '@ms7/ui'

const AppRouter = (props: EntrypointComponentProps) => {
    const { routes } = getConfigRouter()

    return (
        <Routes>
            {RouterGenerator(routes, (<Forbidden403 useDefaults />), props.parentLayout)}
            <Route
                path="*"
                element={<NotFound404 useDefaults />} />
        </Routes>
    )
}

export default AppRouter
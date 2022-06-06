import React from 'react'
import { getConfigRouter } from 'Dummy/configs/app'
import { Route, Routes } from 'react-router-dom'
import AppRouterGenerator from '@/components/generators/app-router-generator'
import NotFound from '@/pages/not-found'

interface Props {
    parentLayout?: React.ElementType,
}

const AppRouter = (props: Props) => {
    const { routes } = getConfigRouter()

    return (
        <React.Fragment>
            <Routes>
                {AppRouterGenerator(routes, props.parentLayout)}
                <Route
                    path={'*'}
                    element={<NotFound />} />
            </Routes>
        </React.Fragment>
    )
}

export default AppRouter
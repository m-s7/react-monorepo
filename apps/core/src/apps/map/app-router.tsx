import React from 'react'
import { getConfigRouter } from 'Map/configs/app'
import { Route, Routes } from 'react-router-dom'
import NotFound from '@/pages/not-found'
import { RouterGenerator } from '@ms7/router'

interface Props {
    parentLayout?: React.ElementType,
}
const AppRouter = (props: Props) => {
    const { routes } = getConfigRouter()

    return (
        <React.Fragment>
            <Routes>
                {RouterGenerator(routes, NotFound, props.parentLayout)}
                <Route
                    path={'*'}
                    element={<NotFound />} />
            </Routes>
        </React.Fragment>
    )
}

export default AppRouter
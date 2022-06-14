import React from 'react'
import { Outlet } from 'react-router-dom'

const Rest = () => (
    <React.Fragment>
        <h5>{'Rest Example'}</h5>
        <Outlet />
    </React.Fragment>
)


export default Rest
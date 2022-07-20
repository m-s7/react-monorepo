import React, { useLayoutEffect, useState } from 'react'
import { Link } from '@ms7/ui'
import { useLocation } from 'react-router-dom'
import AppMenuGenerator from '@/components/generators/app-menu-generator'
import { getMenu } from '@/utils/menu-utils'
import { env, MenuConfig } from '@ms7/common'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    background-color: #343a40;
`

const Sidebar = () => {
    const location = useLocation()
    const [menu, setMenu] = useState<MenuConfig[]>()

    useLayoutEffect(() => {
        setMenu(getMenu())
    }, [location.pathname])

    return (
        <Container className="d-flex flex-column flex-shrink-0 pt-3 ps-3 pe-3 text-white h-100">
            <div className="d-flex justify-content-center">
                <Link
                    to="/"
                    className={'d-flex align-items-center mb-3 mb-md-0 text-white text-decoration-none'}>
                    <FontAwesomeIcon
                        icon="dashboard"
                        size="2x" />
                    <span className="fs-4 ms-2">{env.REACT_APP_NAME}</span>
                </Link>
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {menu && AppMenuGenerator(menu, location)}
            </ul>
            <pre>v0.0.1</pre>
        </Container>
    )
}

export default Sidebar
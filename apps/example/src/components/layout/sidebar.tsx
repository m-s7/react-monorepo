import React, {useContext, useLayoutEffect, useState} from 'react'
import { Link } from '@ms7/ui'
import { useLocation } from 'react-router-dom'
import AppMenuGenerator from '@/components/generators/app-menu-generator'
import { getMenu } from '@/utils/menu-utils'
import { env, MenuConfig } from '@ms7/common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard } from '@fortawesome/free-solid-svg-icons/faDashboard'
import styled from 'styled-components'
import {AuthProviderContext} from "@ms7/auth";

const ThemeDefault = styled.div`
    width: 21px;
    height: 21px;
    background-color: #454d55;
    border: 1px solid #aaaaaa;
`

const ThemeColorful = styled.div`
    width: 21px;
    height: 21px;
    background: rgb(109,58,180);
    background: linear-gradient(90deg, rgba(109,58,180,1) 0%, rgba(253,29,252,1) 50%, rgba(252,69,106,1) 100%);
    border: 1px solid #aaaaaa;
`

const setTheme = (theme: string) => {
    localStorage.setItem('theme', theme)
    window.location.reload()
}

const Sidebar = () => {
    const location = useLocation()
    const context = useContext(AuthProviderContext)
    const [menu, setMenu] = useState<MenuConfig[]>()

    useLayoutEffect(() => {
        setMenu(getMenu())
    }, [location.pathname])

    return (
        <div className="d-flex flex-column flex-shrink-0 pt-3 ps-3 pe-3 background-darker text-white h-100">
            <div className="d-flex justify-content-center">
                <Link
                    to="/"
                    className="d-flex align-items-center mb-3 mb-md-0 text-white text-decoration-none">
                    <FontAwesomeIcon
                        icon={faDashboard}
                        size="2x" />
                    <span className="fs-4 ms-2">{env.REACT_APP_NAME}</span>
                </Link>
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {menu && AppMenuGenerator(menu, location, context)}
            </ul>
            <div className="d-flex sidebar-footer">
                <pre>v0.0.1</pre>
                <pre className="d-flex">
                    <Link
                        to="#"
                        onClick={() => { setTheme('') }}>
                        <ThemeDefault className="me-1" />
                    </Link>
                    <Link
                        to="#"
                        onClick={() => { setTheme('colorful') }}>
                        <ThemeColorful />
                    </Link>
                </pre>
            </div>
        </div>
    )
}

export default Sidebar
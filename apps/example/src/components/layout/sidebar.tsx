import React, { useLayoutEffect, useState } from 'react'
import { Link } from '@ms7/ui'
import { useLocation } from 'react-router-dom'
import AppMenuGenerator from '@/components/generators/app-menu-generator'
import { getMenu } from '@/utils/menu-utils'
import { env, MenuConfig } from '@ms7/common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard } from '@fortawesome/free-solid-svg-icons/faDashboard'

const Sidebar = () => {
    const location = useLocation()
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
                {menu && AppMenuGenerator(menu, location)}
            </ul>
            <pre>v0.0.1</pre>
        </div>
    )
}

export default Sidebar
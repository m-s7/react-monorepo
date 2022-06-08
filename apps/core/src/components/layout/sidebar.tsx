import React, { useContext, useLayoutEffect, useState } from 'react'
import styles from '@/components/layout/sidebar.module.css'
import FooterDropdownItem from '@/components/layout/sidebar/footer-dropdown-item'
import { RouterLink } from '@ms7/bui'
import { Icon } from '@ms7/bui'
import { useLocation } from 'react-router-dom'
import AppMenuGenerator from '@/components/generators/app-menu-generator'
import { getMenu } from '@/utils/menu-utils'
import { MenuConfig } from '@ms7/common'
import { AuthProviderContext } from '@ms7/auth-providers'

const Sidebar = () => {
    const location = useLocation()
    const authContext = useContext(AuthProviderContext)
    const [menu, setMenu] = useState<MenuConfig[]>()

    useLayoutEffect(() => {
        setMenu(getMenu())
    }, [location.pathname])

    return (
        <div className={`d-flex flex-column flex-shrink-0 p-3 text-white ${styles.sidebar}`}>
            <RouterLink
                to={'/'}
                className={'d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none'}>
                <Icon
                    variant={'dashboard'}
                    size={'2x'} />
                <span className="fs-4 ms-2">{'react-core'}</span>
            </RouterLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {menu && AppMenuGenerator(menu, location)}
            </ul>
            <hr />
            <div className="dropup">
                <a
                    href="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img
                        src="https://github.com/m-s7.png"
                        alt=""
                        width="32"
                        height="32"
                        className="rounded-circle me-2" />
                    <strong>{'m-s7'}</strong>
                </a>
                <ul
                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser1">
                    <FooterDropdownItem
                        path={'/profile'}>
                        {'Profile'}
                    </FooterDropdownItem>
                    <li>
                        <hr className={'dropdown-divider'} />
                    </li>
                    {authContext &&
                        <FooterDropdownItem
                            path={'#'}
                            onClick={() => { authContext?.logout() }}>
                            {'Sign out'}
                        </FooterDropdownItem>}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
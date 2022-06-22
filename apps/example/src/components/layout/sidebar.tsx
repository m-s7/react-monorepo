import React, { useContext, useLayoutEffect, useState } from 'react'
import FooterDropdownItem from '@/components/layout/sidebar/footer-dropdown-item'
import { RouterLink } from '@ms7/bui'
import { Icon } from '@ms7/bui'
import { useLocation } from 'react-router-dom'
import AppMenuGenerator from '@/components/generators/app-menu-generator'
import { getMenu } from '@/utils/menu-utils'
import { env, MenuConfig } from '@ms7/common'
import { AuthProviderContext } from '@ms7/auth-providers'
import styled from 'styled-components'

const Container = styled.div`
    background-color: #343a40;
`

const Sidebar = () => {
    const location = useLocation()
    const authContext = useContext(AuthProviderContext)
    const [menu, setMenu] = useState<MenuConfig[]>()

    useLayoutEffect(() => {
        setMenu(getMenu())
    }, [location.pathname])

    return (
        <Container className="d-flex flex-column flex-shrink-0 p-3 text-white h-100">
            <div className="d-flex justify-content-center">
                <RouterLink
                    to={'/'}
                    className={'d-flex align-items-center mb-3 mb-md-0 text-white text-decoration-none'}>
                    <Icon
                        variant={'dashboard'}
                        size={'2x'} />
                    <span className="fs-4 ms-2">{env.REACT_APP_NAME}</span>
                </RouterLink>
            </div>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {menu && AppMenuGenerator(menu, location)}
            </ul>
            <hr />
            <div className="dropup ms-1">
                <a
                    href="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img
                        src="https://github.com/m-s7.png"
                        alt=""
                        width="32"
                        height="32"
                        className="rounded-circle me-2" />
                    <strong>{authContext?.getUserInfo().username || undefined}</strong>
                </a>
                <ul
                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser">
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
                            onClick={() => {
                                window.location.replace(authContext.getLogoutUrl())
                            }}>
                            {'Sign out'}
                        </FooterDropdownItem>}
                </ul>
            </div>
        </Container>
    )
}

export default Sidebar
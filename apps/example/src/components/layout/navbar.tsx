import React, { useContext, useEffect, useState } from 'react'
import { LoaderSmall } from '@ms7/bui'
import { useApiIsLoading } from '@ms7/rest-builder'
import i18n from '@/i18n'
import styled from 'styled-components'
import logo from '@/assets/logo.svg'
import FooterDropdownItem from '@/components/layout/sidebar/footer-dropdown-item'
import { AuthProviderContext } from '@ms7/auth-providers'
import { useNavigate } from 'react-router-dom'
import { RouterLink } from '@ms7/bui'

const LangChangeLink = styled.a<{ lng: string }>`
    ${props => props.lng === i18n.language ? 'pointer-events: none; color: #d1d1d1;' : 'pointer-events: auto;'}
`

const Navbar = () => {
    const isApiLoading = useApiIsLoading()
    const authContext = useContext(AuthProviderContext)
    const navigate = useNavigate()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng).then()
    }

    const UserContent = () => {
        if(!authContext) return null
        
        if(!authContext.isAuthenticated())
            return (<RouterLink to={'/login'}>Sign in</RouterLink>)

        return (
            <div className="dropstart ms-4">
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
                    className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser">
                    <FooterDropdownItem
                        path={'/profile'}>
                        {'Profile'}
                    </FooterDropdownItem>
                    <li>
                        <hr className={'dropdown-divider'} />
                    </li>
                    <FooterDropdownItem
                        path={'#'}
                        onClick={() => {
                            navigate('/logout')
                        }}>
                        {'Sign out'}
                    </FooterDropdownItem>
                </ul>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <img
                    src={logo}
                    height={25} />
                <a
                    className="navbar-brand"
                    href="#">
                    [BRAND]
                </a>
                <div className="navbar-collapse">
                    <LangChangeLink
                        lng={'pl'}
                        href="#"
                        onClick={() => { changeLanguage('pl')}}>
                        pl
                    </LangChangeLink>
                    <div className="vr ms-2 me-2" />
                    <LangChangeLink
                        lng={'en'}
                        href="#"
                        onClick={() => { changeLanguage('en')}}>
                        en
                    </LangChangeLink>
                </div>
                <div className="d-flex">
                    {isApiLoading && <LoaderSmall />}
                </div>
                <UserContent />
            </div>
        </nav>
    )
}

export default Navbar
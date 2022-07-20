import React, { useContext } from 'react'
import { Spinner } from '@ms7/ui'
import { useApiIsLoading } from '@ms7/rest-builder'
import i18n from '@/i18n'
import logo from '@/assets/logo.svg'
import NavbarDropdownItem from '@/components/layout/navbar/navbar-dropdown-item'
import { AuthProviderContext } from '@ms7/auth-providers'
import { useNavigate } from 'react-router-dom'
import { Link } from '@ms7/ui'
import { useTranslation } from 'react-i18next'

const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then()
}

const Navbar = () => {
    const { t } = useTranslation()
    const isApiLoading = useApiIsLoading()
    const authContext = useContext(AuthProviderContext)
    const navigate = useNavigate()

    const UserContent = () => {
        if(!authContext) return null
        
        if(!authContext.isAuthenticated())
            return (
                <Link to="/login">
                    {t('common.sign-in')}
                </Link>
            )

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
                    <NavbarDropdownItem
                        to="/profile">
                        {t('common.profile')}
                    </NavbarDropdownItem>
                    <li>
                        <hr className={'dropdown-divider'} />
                    </li>
                    <NavbarDropdownItem
                        onClick={() => {
                            navigate('/logout')
                        }}>
                        {t('common.sign-out')}
                    </NavbarDropdownItem>
                </ul>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <img
                    src={logo}
                    alt="logo"
                    height={25} />
                <a
                    className="navbar-brand"
                    href="#">
                    [BRAND]
                </a>
                <div className="navbar-collapse">
                    <Link
                        to="#"
                        variant={(i18n.language === 'pl' ? 'default' : 'link')}
                        disabled={i18n.language === 'pl'}
                        onClick={() => { changeLanguage('pl')}}>
                        pl
                    </Link>
                    <div className="vr ms-2 me-2" />
                    <Link
                        to="#"
                        variant={(i18n.language === 'en' ? 'default' : 'link')}
                        disabled={i18n.language === 'en'}
                        onClick={() => { changeLanguage('en')}}>
                        en
                    </Link>
                </div>
                <div className="d-flex">
                    {isApiLoading && <Spinner />}
                </div>
                <UserContent />
            </div>
        </nav>
    )
}

export default Navbar
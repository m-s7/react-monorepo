import React, { useContext } from 'react'
import { Link } from '@ms7/ui'
import { useTranslation } from 'react-i18next'
import NavbarDropdownItem from '@/components/layout/navbar/navbar-dropdown-item'
import { AuthProviderContext } from '@ms7/auth-providers'
import { useNavigate } from 'react-router-dom'

const NavbarUserMenu = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const authContext = useContext(AuthProviderContext)

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
                    <hr className="dropdown-divider" />
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

export default NavbarUserMenu
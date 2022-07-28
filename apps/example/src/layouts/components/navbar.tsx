import React from 'react'
import { Spinner } from '@ms7/ui'
import { useApiIsLoading } from '@ms7/rest-builder'
import i18n from '@/i18n'
import logo from '@/assets/logo.svg'
import { Link } from '@ms7/ui'
import NavbarUserMenu from '@/layouts/components/navbar/navbar-user-menu'

const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then()
}

const Navbar = () => {
    const isApiLoading = useApiIsLoading()

    return (
        <nav className="navbar navbar-expand-md background-darkest">
            <div className="container-fluid">
                <img
                    src={logo}
                    alt="logo"
                    height={25} />
                <Link
                    to="#"
                    className="navbar-brand">
                    [BRAND]
                </Link>
                <div className="navbar-collapse">
                    <Link
                        to="#"
                        variant={(i18n.language.startsWith('pl') ? 'default' : 'link')}
                        disabled={i18n.language.startsWith('pl')}
                        onClick={() => { changeLanguage('pl')}}>
                        pl
                    </Link>
                    <div className="vr ms-2 me-2" />
                    <Link
                        to="#"
                        variant={(i18n.language.startsWith('en') ? 'default' : 'link')}
                        disabled={i18n.language.startsWith('en')}
                        onClick={() => { changeLanguage('en')}}>
                        en
                    </Link>
                </div>
                <div className="d-flex">
                    {isApiLoading && <Spinner />}
                </div>
                <NavbarUserMenu />
            </div>
        </nav>
    )
}

export default Navbar
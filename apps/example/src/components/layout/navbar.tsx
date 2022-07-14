import React, { useEffect, useState } from 'react'
import { LoaderSmall } from '@ms7/bui'
import { useApiIsLoading } from '@ms7/rest-builder'
import i18n from '@/i18n'
import styled from 'styled-components'
import logo from '@/assets/logo.svg'

const LangChangeLink = styled.a<{ lng: string }>`
    ${props => props.lng === i18n.language ? 'pointer-events: none; color: #d1d1d1;' : 'pointer-events: auto;'}
`

const Navbar = () => {
    const isApiLoading = useApiIsLoading()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng).then()
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
                    {/*    <ul className="navbar-nav me-auto mb-2 mb-md-0">*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <a*/}
                    {/*                className="nav-link active"*/}
                    {/*                aria-current="page"*/}
                    {/*                href="#">*/}
                    {/*                Home*/}
                    {/*            </a>*/}
                    {/*        </li>*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <a*/}
                    {/*                className="nav-link"*/}
                    {/*                href="#">*/}
                    {/*                Link*/}
                    {/*            </a>*/}
                    {/*        </li>*/}
                    {/*        <li className="nav-item">*/}
                    {/*            <a*/}
                    {/*                className="nav-link disabled"*/}
                    {/*                href="#"*/}
                    {/*                tabIndex={-1}*/}
                    {/*                aria-disabled="true">*/}
                    {/*                Disabled*/}
                    {/*            </a>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                </div>
                <div className="d-flex">
                    {isApiLoading && <LoaderSmall />}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
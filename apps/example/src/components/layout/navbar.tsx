import React, { useEffect, useState } from 'react'
import { LoaderSmall } from '@ms7/bui'
// import { apiSubject as rtkSubject, Subscription as RtkSubscription } from '@ms7/restful-rtk'
// import { apiSubject as reduxSubject, Subscription as ReduxSubscription } from '@ms7/restful-redux'
import i18n from '@/i18n'
import styled from 'styled-components'
import logo from '@/assets/logo.svg'

const LangChangeLink = styled.a<{ lng: string }>`
    ${props => props.lng === i18n.language ? 'pointer-events: none; color: #d1d1d1;' : 'pointer-events: auto;'}
`

const Navbar = () => {
    const [isLoading, setIsLoading] = useState(false)

    // let rtkSubjectSubscription: RtkSubscription | undefined
    // let reduxSubjectSubscription: ReduxSubscription | undefined

    // const handleApiMessage = (isApiLoading: boolean) => {
    //     if(isLoading !== isApiLoading) setIsLoading(isApiLoading)
    // }
    //
    // useEffect(() => {
    //     rtkSubjectSubscription = rtkSubject.subscribe({
    //         next: message => handleApiMessage(message.isLoading),
    //     })
    //
    //     reduxSubjectSubscription = reduxSubject.subscribe({
    //         next: message => handleApiMessage(message.isLoading),
    //     })
    // })
    //
    // useEffect(() => () => {
    //     rtkSubjectSubscription?.unsubscribe()
    //     reduxSubjectSubscription?.unsubscribe()
    // }, [])

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
                    {isLoading && <LoaderSmall />}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
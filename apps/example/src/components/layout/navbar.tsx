import React, { useEffect, useState } from 'react'
import { LoaderSmall } from '@ms7/bui'
import { apiSubject as rtkSubject, Subscription as RtkSubscription } from '@ms7/restful-rtk'
import { apiSubject as reduxSubject, Subscription as ReduxSubscription } from '@ms7/restful-redux'

const Navbar = () => {
    const [isLoading, setIsLoading] = useState(false)

    let rtkSubjectSubscription: RtkSubscription | undefined
    let reduxSubjectSubscription: ReduxSubscription | undefined

    const handleApiMessage = (isApiLoading: boolean) => {
        if(isLoading !== isApiLoading) setIsLoading(isApiLoading)
    }

    useEffect(() => {
        rtkSubjectSubscription = rtkSubject.subscribe({
            next: message => handleApiMessage(message.isLoading),
        })

        reduxSubjectSubscription = reduxSubject.subscribe({
            next: message => handleApiMessage(message.isLoading),
        })
    })

    useEffect(() => () => {
        rtkSubjectSubscription?.unsubscribe()
        reduxSubjectSubscription?.unsubscribe()
    }, [])

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    href="#">
                    {'Fixed navbar'}
                </a>
                {/*<div className="navbar-collapse">*/}
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
                {/*</div>*/}
                <div className="d-flex">
                    {isLoading && <LoaderSmall />}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
import React from 'react'
import SmallLoader from '@/components/ui/small-loader'
import { selectStatus } from '@/store/reducers/rest-reducer'
import { useAppSelector } from '@/hooks/use-app-selector'

const Navbar = () => {
    const restStatus = useAppSelector(selectStatus)
    const isRestLoading = (): boolean => restStatus === 'loading'

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    href="#">
                    {'Fixed navbar'}
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#">
                                Link
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link disabled"
                                href="#"
                                tabIndex={-1}
                                aria-disabled="true">
                                Disabled
                            </a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {isRestLoading() && <SmallLoader />}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
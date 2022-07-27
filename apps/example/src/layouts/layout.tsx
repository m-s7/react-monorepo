import React from 'react'
import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import Header from '@/components/layout/header'

const Layout = (props: React.PropsWithChildren<void>) => {
    const { children } = props

    return (
        <div className="d-flex h-100 background-dark">
            <div className="container-sidebar">
                <Sidebar />
            </div>
            <div className="d-flex flex-column flex-grow-1">
                <Navbar />
                <Header />
                <div className="p-1 h-100">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
import React from 'react'
import Sidebar from '@/layouts/components/sidebar'
import Navbar from '@/layouts/components/navbar'
import Header from '@/layouts/components/header'

export const MainLayout = (props: React.PropsWithChildren) => (
    <div className="d-flex h-100 background-dark">
        <div className="container-sidebar">
            <Sidebar />
        </div>
        <div className="d-flex flex-column flex-grow-1">
            <Navbar />
            <Header />
            <div className="p-1 h-100">
                {props.children}
            </div>
        </div>
    </div>
)

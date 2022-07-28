import React, { useContext, useEffect, useState } from 'react'
import AppRouter from '@/app-router'
import { AuthProviderContext } from '@ms7/auth'
import { FullPageSpinner } from '@ms7/ui'
import i18n from '@/i18n'

const App = () => {
    const authContext = useContext(AuthProviderContext)
    const [, setIsAuthenticated] = useState(false)
    const [showLoader, setShowLoader] = useState(true)

    useEffect(() => {
        i18n.on('languageChanged', () => {
            setShowLoader(true)
            window.location.reload()
        })

        if(!authContext || authContext.isAuthenticated())
            setShowLoader(false)
        else
            authContext?.onAuthStateChanged((isAuthenticated => {
                setShowLoader(false)
                setIsAuthenticated(isAuthenticated)
            }))


        return () => {
            i18n.off('languageChanged')
        }
    }, [])

    if(showLoader)
        return (<FullPageSpinner useDefaults />)

    return (<AppRouter />)
}

export default App

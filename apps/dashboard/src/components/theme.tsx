import React, { useEffect, useState } from 'react'

const Theme = (props: React.PropsWithChildren) => {
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || '')

    const onStorageChanged = () => {
        setTheme(localStorage.getItem('theme') || '')
    }
    
    useEffect(() => {
        window.addEventListener('storage', onStorageChanged)
        
        return () => { window.removeEventListener('storage', onStorageChanged) }
    }, [])
    
    return (
        <div className={`${theme}-theme h-100`}>
            {props.children}
        </div>
    )
}

export default Theme
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from '@/components/router/nav/link.module.css'

interface LinkProps {
    children: React.ReactNode | React.ReactNode[],
    to: string,
    disabled?: boolean,
    className?: string,
}

const Link = (props: LinkProps) => {
    const { children, to, disabled = false, className = '' } = props
    const classes = `${className} ${disabled ? styles.disabled : ''}`

    return (
        <RouterLink
            to={to}
            className={classes}>
            {children}
        </RouterLink>
    )
}

export default Link
import React from 'react'
import styles from '@/components/router/nav/base-link.module.css'
import { Link } from 'react-router-dom'

interface BaseLinkProps {
    to: string,
    text?: string,
}

const BaseLink = (props: BaseLinkProps) => {
    const { to, text } = props

    return (
        <Link
            to={to}
            className={styles.link}>
            {text}
        </Link>
    )
}

export default BaseLink
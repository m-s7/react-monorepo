import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, React.AriaAttributes {
    variant?:
    'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark' | 'link' |
    'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-warning' |
    'outline-danger' | 'outline-info' | 'outline-light' | 'outline-dark',
    size?: 'sm' | 'lg',
}

const Button = (props: ButtonProps) => {
    const { children, variant = 'primary', size = '', className, ...rest } = props

    return (
        <button
            className={`btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`}
            {...rest}>
            {children}
        </button>
    )
}

export default Button
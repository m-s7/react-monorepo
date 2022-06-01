import React from 'react'
import styles from '@/components/ui/card/card.module.css'

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, React.AriaAttributes {
    header?: React.ReactNode | React.ReactNode[],
    fillViewport?: boolean,
}

const Card = (props: CardProps) => {
    const { children, className, header, fillViewport, ...rest } = props

    return (
        <div
            className={`card ${fillViewport ? 'h-100 w-100' : ''} ${className} ${styles.card}`}
            {...rest}>
            {header && <div className={'card-header'}>{header}</div>}
            <div className={'card-body'}>
                {children}
            </div>
        </div>
    )
}

export default Card
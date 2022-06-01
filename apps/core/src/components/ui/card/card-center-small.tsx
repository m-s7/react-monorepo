import React from 'react'
import styles from '@/components/ui/card/card-center-small.module.css'

interface CardCenteredProps extends React.HTMLAttributes<HTMLElement>, React.AriaAttributes {
    fullSpace?: boolean,
}

const CardCenterSmall = (props: CardCenteredProps) => {
    const { children } = props

    return (
        <div className={`card ${styles.card}`}>
            <div className={'card-header text-center'}>{'react-core'}</div>
            <div className={`card-body ${styles.body}`}>
                {children}
            </div>
        </div>
    )
}

export default CardCenterSmall
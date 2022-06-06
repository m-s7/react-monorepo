import React from 'react'
import styles from '@/components/full-page-loader.module.css'
import BaseLink from '@/components/router/nav/base-link'
import LayoutEmpty from '@/layouts/layout-empty'
import CardCenterSmall from '@/components/ui/card/card-center-small'

interface Props {
    navigateName?: string,
    navigatePath?: string,
}

const FullPageLoader = (props: Props) => {
    const { navigateName, navigatePath } = props
    return (
        <LayoutEmpty>
            <CardCenterSmall>
                <div className={`${styles.loader}`} />
                <span className={styles.info}>{'Please wait...'}</span>
                {(navigateName && navigatePath) &&
                    <BaseLink
                        to={navigatePath}
                        text={navigateName} />
                }
            </CardCenterSmall>
        </LayoutEmpty>
    )
}

export default FullPageLoader

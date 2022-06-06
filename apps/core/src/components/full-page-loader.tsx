import React from 'react'
import styles from '@/components/full-page-loader.module.css'
import BaseLink from '@/components/router/nav/base-link'
import LayoutEmpty from '@/layouts/layout-empty'
import { CardSmallCentered } from '@ms7/bui'

interface Props {
    navigateName?: string,
    navigatePath?: string,
}

const FullPageLoader = (props: Props) => {
    const { navigateName, navigatePath } = props
    return (
        <LayoutEmpty>
            <CardSmallCentered>
                <div className={`${styles.loader}`} />
                <span className={styles.info}>{'Please wait...'}</span>
                {(navigateName && navigatePath) &&
                    <BaseLink
                        to={navigatePath}
                        text={navigateName} />
                }
            </CardSmallCentered>
        </LayoutEmpty>
    )
}

export default FullPageLoader

import React from 'react'
import { Link } from '../components/link'
import { Spinner } from '../components/spinner'
import { LayoutEmpty } from '../layouts/layout-empty'
import { CardCentered } from '../components/card-centered'

interface FullPageLoaderProps {
    header?: string,
    navigateName?: string,
    navigatePath?: string,
}

export const FullPageLoader = (props: FullPageLoaderProps) => {
    const { header, navigateName, navigatePath } = props

    return (
        <LayoutEmpty>
            <CardCentered header={header}>
                <Spinner
                    size={150}
                    className="mb-2" />
                <span>{'Please wait...'}</span>
                {(navigateName && navigatePath) &&
                    <Link to={navigatePath}>
                        {navigateName}
                    </Link>
                }
            </CardCentered>
        </LayoutEmpty>
    )
}

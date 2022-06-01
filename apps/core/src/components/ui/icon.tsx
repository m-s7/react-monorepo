import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'

// TODO: change path keys from config
interface IconProps extends React.HTMLAttributes<HTMLElement> {
    variant: IconProp,
    size?: SizeProp,
}

const Icon = (props: IconProps) => {
    const { className, variant, size } = props

    return (
        <FontAwesomeIcon
            size={size}
            className={className}
            icon={variant} />
    )
}

export default Icon
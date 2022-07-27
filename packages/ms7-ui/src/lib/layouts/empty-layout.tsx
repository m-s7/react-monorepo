import React from 'react'
import '../css/common.css'

export const EmptyLayout = (props: React.PropsWithChildren) => (
    <div className="h-100 background-dark">
        <div>{props.children}</div>
    </div>
)

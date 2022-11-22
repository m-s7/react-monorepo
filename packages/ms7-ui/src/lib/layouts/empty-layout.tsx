import React from 'react'

export const EmptyLayout = (props: React.PropsWithChildren) => (
    <div className="h-100 background-dark">
        <div>{props.children}</div>
    </div>
)

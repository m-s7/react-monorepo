import React from 'react'

export const MiniLayout = (props: React.PropsWithChildren) => (
    <div className="d-flex p-1 h-100 background-dark">
        {props.children}
    </div>
)

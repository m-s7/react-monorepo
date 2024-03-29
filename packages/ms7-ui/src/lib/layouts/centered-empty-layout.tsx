import React from 'react'

export const CenteredEmptyLayout = (props: React.PropsWithChildren) => (
    <div className="d-flex align-items-center h-100 background-dark">
        <div className="m-auto">
            <div>{props.children}</div>
        </div>
    </div>
)

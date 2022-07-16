import React, { useEffect, useState } from 'react'

interface CallbackListProps {
    getItems: (incrementBy: number) => number[],
}

const CallbackList = (props: CallbackListProps) => {
    const [items, setItems] = useState<number[]>([])

    const { getItems } = props

    useEffect(() => {
        setItems(getItems(3))
    }, [getItems])
    
    return (
        <React.Fragment>
            {items.map((item, index) => <div key={`item-${index}`}>{item}</div>)}
        </React.Fragment>
    )
}

export default CallbackList
import React, { useEffect, useState } from 'react'

interface CallbackListProps {
    getItems: (incrementBy: number) => number[],
    className?: string,
}

const CallbackList = (props: CallbackListProps) => {
    const [items, setItems] = useState<number[]>([])

    const { getItems, className } = props

    useEffect(() => {
        setItems(getItems(3))
    }, [getItems])
    
    return (
        <table className={`table text-center ${className || ''}`}>
            <tbody>
                <tr>
                    {items.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}

export default CallbackList
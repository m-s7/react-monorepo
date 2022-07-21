import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'

interface CallbackListProps {
    getItems: (incrementBy: number) => number[],
    className?: string,
}

const CallbackList = (props: CallbackListProps) => {
    const [items, setItems] = useState<number[]>([])

    const { getItems, className = '' } = props

    useEffect(() => {
        setItems(getItems(3))
    }, [getItems])
    
    return (
        <Table
            striped
            bordered
            className={className}>
            <tbody>
                <tr>
                    {items.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))}
                </tr>
            </tbody>
        </Table>
    )
}

export default CallbackList
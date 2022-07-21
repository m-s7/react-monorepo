import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useFetchCarsQuery } from 'Core/api/graphql/generated'
import { useQueryClient } from 'react-query'
import { Card, Spinner } from '@ms7/ui'
import Table from 'react-bootstrap/Table'

const GraphQL = () => {
    const endpoint = 'http://localhost:4000'
    const queryClient = useQueryClient()
    const [isLoadingMock, setIsLoadingMock] = useState(false) // simulate slow network

    const { data, isFetching } = useFetchCarsQuery({
        endpoint,
        fetchParams: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    })

    const Content = () => (
        <>
            <Table
                className="mb-3"
                variant="success">
                <tbody>
                    <tr className="text-center">
                        {data?.cars.map((car, index) => (
                            <td key={index}>{`${car?.brand} - ${car?.model}`}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
            <Button
                onClick={() => {
                    setIsLoadingMock(true)
                    setTimeout(() => {
                        queryClient.invalidateQueries(useFetchCarsQuery.getKey()).then()
                        setIsLoadingMock(false)
                    }, 1500)
                }}>
                Invalidate Data
            </Button>
        </>
    )
    
    return (
        <div className="d-flex justify-content-center">
            <Card className="w-50 align-items-center">
                {(isFetching || isLoadingMock) ? <Spinner /> : <Content />}
            </Card>
        </div>
    )
}

export default GraphQL
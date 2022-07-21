import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useFetchCarsQuery } from 'Core/api/graphql/generated'
import { useQueryClient } from 'react-query'
import { Card, Spinner } from '@ms7/ui'
import Table from 'react-bootstrap/Table'
import ErrorFallback from 'Core/components/error-fallback'

// this component simulates slow network, it should not be used in production
const GraphQL = () => {
    const endpoint = 'http://localhost:4000'
    const queryClient = useQueryClient()
    const [isEnabled, setIsEnabled] = useState(false)
    const [isLoadingMock, setIsLoadingMock] = useState(true) // simulates slow network

    const { data, error, refetch, isFetching } = useFetchCarsQuery({
        endpoint,
        fetchParams: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    }, {}, { enabled: isEnabled, retry: 0 })

    useEffect(() => {
        setTimeout(() => {
            setIsEnabled(true)
            refetch().then()
            setIsLoadingMock(false)
        }, 1500)
    }, [])

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
        <ErrorFallback
            className="d-flex justify-content-center"
            error={(isLoadingMock ? null : (error as Error))}
            onRetry={() => {
                setIsLoadingMock(true)
                setTimeout(() => {
                    setIsLoadingMock(false)
                    refetch().then()
                }, 1500)
            }}>
            <div className="d-flex justify-content-center">
                <Card className="w-50 align-items-center">
                    {(isFetching || isLoadingMock) ? <Spinner size={75} /> : <Content />}
                </Card>
            </div>
        </ErrorFallback>
    )
}

export default GraphQL
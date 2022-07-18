import React, { useState } from 'react'
import { useFetchCarsQuery } from 'Core/api/graphql/generated'
import { useQueryClient } from 'react-query'
import { Button, LoaderSmall, Card } from '@ms7/bui'

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
            <table className="table table-success mb-3">
                <tbody>
                    <tr className="text-center">
                        {data?.cars.map((car, index) => (
                            <td key={index}>{`${car?.brand} - ${car?.model}`}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
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
            <Card className="m-1 w-50 align-items-center">
                {(isFetching || isLoadingMock) ? <LoaderSmall /> : <Content />}
            </Card>
        </div>
    )
}

export default GraphQL
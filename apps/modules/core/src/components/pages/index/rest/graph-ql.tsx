import React from 'react'
import { useFetchCarsQuery } from 'Core/api/graphql/generated'
import { useQueryClient } from 'react-query'
import { Button, LoaderSmall, Card } from '@ms7/bui'

const GraphQL = () => {
    const endpoint = 'http://localhost:4000'
    const queryClient = useQueryClient()

    const { data, isFetching } = useFetchCarsQuery({
        endpoint,
        fetchParams: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    })

    const Cars = () => (
        <React.Fragment>
            {data?.cars.map(car => (<div key={car?.id}>{`${car?.brand} - ${car?.model}`}</div>))}
        </React.Fragment>
    )
    
    return (
        <div className="d-flex flex-column">
            <Card className="m-1 w-50">
                {isFetching ? <LoaderSmall /> : <Cars />}
                <Button
                    onClick={() => {
                        queryClient.invalidateQueries(useFetchCarsQuery.getKey()).then()
                    }}>
                INVALIDATE!!
                </Button>
            </Card>
        </div>
    )
}

export default GraphQL
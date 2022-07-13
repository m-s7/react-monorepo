import React from 'react'
import { Card } from '@ms7/bui'
import { useFetchCarsQuery } from 'Core/graphql/generated'

const GraphQL = () => {
    const endpoint = 'http://localhost:4000'
    const { data } = useFetchCarsQuery({
        endpoint,
        fetchParams: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    })

    // const { data: cars } = useQuery<Car[]>(['cars'], async () => {
    //     const { cars } = await request(
    //         endpoint,
    //         gql`
    //             query fetchCars {
    //               cars {
    //                 id
    //                 brand
    //                 model
    //                 similar {
    //                     id
    //                 }
    //               }
    //             }
    //           `,
    //     )
    //
    //     return cars
    // })

    return (
        <div className="d-flex flex-column">
            <Card className="m-1 w-50">
                {data?.cars.map(car => (<div key={car?.id}>{`${car?.brand} - ${car?.model}`}</div>))}
            </Card>
        </div>
    )
}

export default GraphQL
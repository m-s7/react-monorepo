import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { GraphQLClient, gql } from 'graphql-request'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { Car } from 'Core/graphql/generated'

export const client = new GraphQLClient('http://localhost:4000')

export const api = createApi({
    reducerPath: 'gql',
    baseQuery: graphqlRequestBaseQuery({ client }),
    endpoints: build => ({
        getCars: build.query<Car[], void>({
            query: () => ({
                document: gql`
                    query {
                        cars {
                            id
                            brand
                            model
                            similar {
                                id
                            }
                        }
                    }
                `,
            }),
            transformResponse: (response: { cars: Car[] }) => response.cars,
        }),
    }),
})

export const { useGetCarsQuery } = api
export default api

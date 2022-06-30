import React from 'react'
import { Card } from '@ms7/bui'
import { useQuery } from 'react-query'
import { User } from 'Core/business/types/user'
import  { getUsers } from 'Core/api/rq-user-api'

const GraphQL = () => {
    const { data: users } = useQuery<User[], Error>('user', getUsers, { refetchOnMount: true })
    // const { data: cars, error, isLoading, isFetching, refetch } = useGetCarsQuery(undefined, { refetchOnMountOrArgChange: true, skip: false })

    // const Cars = () => (
    //     <React.Fragment>
    //         {cars?.map(car => (<div key={car.id}>{`${car.brand} - ${car.model}`}</div>))}
    //     </React.Fragment>
    // )

    const Users = () => (
        <React.Fragment>
            {users?.map(user => (<div key={user.id}>{`${user.name} - ${user.age}`}</div>))}
        </React.Fragment>

    )

    return (
        <div className="d-flex flex-column">
            <Card className="m-1 w-50">
                {/*<Cars />*/}
                <hr />
                <Users />
            </Card>
        </div>
    )
}

export default GraphQL
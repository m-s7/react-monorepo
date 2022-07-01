import React from 'react'
import { Card } from '@ms7/bui'
import { useMutation, useQuery } from 'react-query'
import { User } from 'Core/business/types/user'
import { getUsers, createUser, updateUser } from 'Core/api/rq-user-api'
import { Optional } from '@ms7/common'
import { Button } from '@ms7/bui'

const GraphQL = () => {
    const { data: users } = useQuery<User[], Error>('user', getUsers, { refetchOnMount: false, refetchOnWindowFocus: false })
    // const mutation = useMutation((args: Optional<User, 'id'>) => createUser(args))
    const mutation = useMutation((args: User) => updateUser(args))
    // const { data: cars, error, isLoading, isFetching, refetch } = useGetCarsQuery(undefined, { refetchOnMountOrArgChange: true, skip: false })

    // const Cars = () => (
    //     <React.Fragment>
    //         {cars?.map(car => (<div key={car.id}>{`${car.brand} - ${car.model}`}</div>))}
    //     </React.Fragment>
    // )

    const Users = () => (
        <React.Fragment>
            {users?.map(user => (<div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>))}
        </React.Fragment>
    )

    return (
        <div className="d-flex flex-column">
            <Card className="m-1 w-50">
                {/*<Cars />*/}
                <Button
                    onClick={() => {
                        mutation.mutate({ id: 6, age: 987, name: 'Thomas' })
                    }}>
                    CREATE
                </Button>
                <hr />
                <Users />
            </Card>
        </div>
    )
}

export default GraphQL
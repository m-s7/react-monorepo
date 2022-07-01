import React, {useState} from 'react'
import { Card } from '@ms7/bui'
import {useInfiniteQuery, useMutation, useQuery} from 'react-query'
import { User } from 'Core/business/types/user'
import { getUsers, getUser, createUser, updateUser, patchUser, deleteUser } from 'Core/api/rq-user-api'
import { Optional } from '@ms7/common'
import { Button } from '@ms7/bui'

const GraphQL = () => {
    const [id, setId] = useState(0)

    const { data: user } = useQuery<User, Error>(['user', id], () => getUser(id), { enabled: (id > 0), refetchOnMount: false, refetchOnWindowFocus: false })
    const { data: users } = useQuery<User[], Error>('users', getUsers, { refetchOnMount: false, refetchOnWindowFocus: false })
    // const mutation = useMutation((args: Optional<User, 'id'>) => createUser(args))
    // const mutation = useMutation((args: User) => updateUser(args))
    // const mutation = useMutation((args: Optional<User, 'age' | 'name'>) => patchUser(args))
    // const mutation = useMutation((id: number) => deleteUser(id))
    // const { data: cars, error, isLoading, isFetching, refetch } = useGetCarsQuery(undefined, { refetchOnMountOrArgChange: true, skip: false })

    // const Cars = () => (
    //     <React.Fragment>
    //         {cars?.map(car => (<div key={car.id}>{`${car.brand} - ${car.model}`}</div>))}
    //     </React.Fragment>
    // )

    const User = () => (
        <React.Fragment>
            {user ? <div>{`${user.id} - ${user.name} - ${user.age}`}</div> : ''}
        </React.Fragment>
    )

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
                        setId(15)
                        // mutation.mutate(24)
                    }}>
                    CREATE
                </Button>
                <hr />
                <User />
                <hr />
                <Users />
            </Card>
        </div>
    )
}

export default GraphQL
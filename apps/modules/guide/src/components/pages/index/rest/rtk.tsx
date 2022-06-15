import React, { useState } from 'react'
import { Button } from '@ms7/bui'
import { User } from 'Guide/business/models/user/user'
import {
    useCreateUserMutation, useDeleteUserMutation,
    useGetUsersQuery,
    useLazyGetUserQuery,
    usePatchUserMutation,
    useUpdateUserMutation,
} from 'Guide/api/rtk-user-api'
import { getNormalizedError } from 'Guide/business/lib/rtk/utils'
import CenteredLoader from 'Guide/components/centered-loader'
import ErrorFallback from 'Guide/components/error-fallback'
import { LoaderSmall } from '@ms7/bui'

const RestRTK = () => {
    const [selectedId, setSelectedId] = useState(0)
    const [mutatedUser, setMutatedUser] = useState<User | undefined>()
    const [mutatedError, setMutatedError] = useState<Error | undefined>()

    const { data: users, error, isFetching, refetch } = useGetUsersQuery(undefined, { refetchOnMountOrArgChange: false, skip: false })
    const [trigger, { data: user, isFetching: isFetchingLazy, error: errorLazy }] = useLazyGetUserQuery()

    const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
    const [patchUser, { isLoading: isPatching }] = usePatchUserMutation()
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

    if(isFetching)
        return (<CenteredLoader text={'Loading users...'} />)

    const Users = () => (
        <React.Fragment>
            {users?.map(user => (<div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>))}
        </React.Fragment>

    )

    const LazyResult = () => {
        if(!isFetchingLazy) {
            if(errorLazy)
                return (<div className="danger">{`Error: ${getNormalizedError(errorLazy)?.message}`}</div>)

            if(user)
                return (<div>{`${user.id} - ${user.name} - ${user.age}`}</div>)
        }

        return null
    }

    const MutatedResult = () => {
        if(mutatedError)
            return (<div className="danger">{`Error: ${getNormalizedError(mutatedError)?.message}`}</div>)

        if(mutatedUser)
            return (<div>{`${mutatedUser.id} - ${mutatedUser.name} - ${mutatedUser.age}`}</div>)

        return null
    }

    return (
        <ErrorFallback
            error={getNormalizedError(error)}
            onRetry={() => refetch()}>
            <div className="d-flex flex-row p-3">
                <div className="w-25">
                    <p>Actions</p>
                    <Button
                        className="m-1 w-75"
                        disabled={isFetchingLazy}
                        onClick={() => trigger(Math.floor(Math.random() * 9))}>
                        {isFetchingLazy ? <LoaderSmall /> : 'get user'}
                    </Button>
                    <Button
                        className="m-1 w-75"
                        disabled={isCreating}
                        onClick={() => {
                            createUser({ age: 666, name: 'Monica' })
                                .unwrap()
                                .then(user => {
                                    setMutatedError(undefined)
                                    setMutatedUser(user)
                                })
                                .catch(error => {
                                    setMutatedUser(undefined)
                                    setMutatedError(error)
                                })
                        }}>
                        {isCreating ? <LoaderSmall /> : 'create user'}
                    </Button>
                    <Button
                        className="m-1 w-75"
                        disabled={isCreating}
                        onClick={() => {
                            updateUser({ id: selectedId, age: 666, name: 'Monica' })
                                .unwrap()
                                .then(user => {
                                    setMutatedError(undefined)
                                    setMutatedUser(user)
                                })
                                .catch(error => {
                                    setMutatedUser(undefined)
                                    setMutatedError(error)
                                })
                        }}>
                        {isUpdating ? <LoaderSmall /> : 'update user'}
                    </Button>
                    <Button
                        className="m-1 w-75"
                        disabled={isCreating}
                        onClick={() => {
                            patchUser({ id: selectedId, age: 123 })
                                .unwrap()
                                .then(user => {
                                    setMutatedError(undefined)
                                    setMutatedUser(user)
                                })
                                .catch(error => {
                                    setMutatedUser(undefined)
                                    setMutatedError(error)
                                })
                        }}>
                        {isPatching ? <LoaderSmall /> : 'patch user'}
                    </Button>
                    <Button
                        className="m-1 w-75"
                        disabled={isCreating}
                        onClick={() => {
                            deleteUser({ id: selectedId })
                                .unwrap()
                                .then(() => {
                                    setMutatedError(undefined)
                                    setMutatedUser(undefined)
                                })
                                .catch(error => {
                                    setMutatedUser(undefined)
                                    setMutatedError(error)
                                })
                        }}>
                        {isDeleting ? <LoaderSmall /> : 'delete user'}
                    </Button>
                    <hr className="m-1 w-75" />
                    <label className="m-1 d-block">[update/patch/delete] user id</label>
                    <input
                        className="text-black m-1 w-75"
                        value={selectedId}
                        type='number'
                        onChange={e => setSelectedId(Number(e.target.value))} />
                </div>
                <div className="w-25">
                    <p>Results Mutation</p>
                    <MutatedResult />
                </div>
                <div className="w-25">
                    <p>Results Lazy</p>
                    <LazyResult />
                </div>
                <div className="w-25">
                    <p>Results</p>
                    <Users />
                </div>
            </div>
        </ErrorFallback>
    )
}

export default RestRTK
import React, { useState } from 'react'
import { Button } from '@ms7/bui'
import { User } from 'Guide/business/types/user'
import {
    useCreateUserMutation, useDeleteUserMutation,
    useGetUsersQuery,
    useLazyGetUserQuery,
    usePatchUserMutation,
    useUpdateUserMutation,
} from 'Guide/api/rtk-user-api'
import { getNormalizedError } from '@ms7/restful-rtk'
import ErrorFallback from 'Guide/components/error-fallback'
import { LoaderSmall } from '@ms7/bui'
import { Card } from '@ms7/bui'
import { useTranslation } from 'react-i18next'

const RestRTK = () => {
    const { t } = useTranslation()
    const [selectedId, setSelectedId] = useState(0)
    const [mutatedUser, setMutatedUser] = useState<User | undefined>()
    const [mutatedError, setMutatedError] = useState<Error | undefined>()

    const { data: users, error, isLoading, isFetching, refetch } = useGetUsersQuery(undefined, { refetchOnMountOrArgChange: false, skip: false })
    const [trigger, { data: user, isFetching: isFetchingLazy, error: errorLazy }] = useLazyGetUserQuery()

    const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
    const [patchUser, { isLoading: isPatching }] = usePatchUserMutation()
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

    const Users = () => (
        <React.Fragment>
            {users?.map(user => (<div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>))}
        </React.Fragment>

    )

    const LazyResult = () => {
        if(!isFetchingLazy) {
            if(errorLazy)
                return (<div className="danger">{`${t('rest-rtk.label.error')}: ${getNormalizedError(errorLazy)?.message}`}</div>)

            if(user)
                return (<div>{`${user.id} - ${user.name} - ${user.age}`}</div>)
        }

        return null
    }

    const MutatedResult = () => {
        if(mutatedError)
            return (<div className="danger">{`${t('rest-rtk.label.error')}: ${getNormalizedError(mutatedError)?.message}`}</div>)

        if(mutatedUser)
            return (<div>{`${mutatedUser.id} - ${mutatedUser.name} - ${mutatedUser.age}`}</div>)

        return null
    }

    return (
        <ErrorFallback
            className="d-flex justify-content-center m-1"
            error={!isFetching ? getNormalizedError(error) : undefined}
            onRetry={() => refetch()}>
            <div className="d-flex flex-row m-1">
                <Card className="w-25 me-1">
                    <div className="d-flex flex-column align-items-center">
                        <p>{t('rest-rtk.label.actions')}</p>
                        <Button
                            className="m-1 w-75"
                            disabled={isLoading || isFetching || isFetchingLazy}
                            onClick={() => trigger(selectedId)}>
                            {t('rest-rtk.button.get')}
                        </Button>
                        <Button
                            className="m-1 w-75"
                            disabled={isLoading || isFetching || isCreating}
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
                            {t('rest-rtk.button.create')}
                        </Button>
                        <Button
                            className="m-1 w-75"
                            disabled={isLoading || isFetching || isUpdating}
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
                            {t('rest-rtk.button.update')}
                        </Button>
                        <Button
                            className="m-1 w-75"
                            disabled={isLoading || isFetching || isPatching}
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
                            {t('rest-rtk.button.patch')}
                        </Button>
                        <Button
                            className="m-1 w-75"
                            disabled={isLoading || isFetching || isDeleting}
                            onClick={() => {
                                deleteUser(selectedId)
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
                            {t('rest-rtk.button.delete')}
                        </Button>
                        <hr className="m-1 w-75" />
                        <label className="m-1 d-block">{t('rest-rtk.label.user-id')}</label>
                        <input
                            className="text-black m-1 w-75"
                            value={selectedId}
                            type='number'
                            onChange={e => setSelectedId(Number(e.target.value))} />
                    </div>
                </Card>
                <Card className="w-25 me-1">
                    <div className="d-flex flex-column align-items-center">
                        <p>{t('rest-rtk.label.results-mutation')}</p>
                        {(isCreating || isUpdating || isPatching || isDeleting) ? <LoaderSmall /> : <MutatedResult />}
                    </div>
                </Card>
                <Card className="w-25 me-1">
                    <div className="d-flex flex-column align-items-center">
                        <p>{t('rest-rtk.label.results-lazy')}</p>
                        {isFetchingLazy ? <LoaderSmall /> : <LazyResult />}
                    </div>
                </Card>
                <Card className="w-25">
                    <div className="d-flex flex-column align-items-center">
                        <p>{t('rest-rtk.label.results')}</p>
                        {(isLoading || isFetching) ? <LoaderSmall /> : <Users />}
                    </div>
                </Card>
            </div>
        </ErrorFallback>
    )
}

export default RestRTK
import React, { useState } from 'react'
import { Button } from '@ms7/bui'
import { User } from 'Core/business/types/user'
import ErrorFallback from 'Core/components/error-fallback'
import { LoaderSmall } from '@ms7/bui'
import { Card } from '@ms7/bui'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getUser, getUsers, createUser, updateUser, patchUser, deleteUser } from 'Core/api/rq-user-api'
import { Optional } from '@ms7/common'

interface MutationButtonProps {
    onClick: () => void,
    label: string,
}

const RestRQ = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [selectedGetId, setSelectedGetId] = useState(0)
    const [selectedMutationId, setSelectedMutationId] = useState(0)
    const [isMutating, setIsMutating] = useState(false)
    const [mutatedUser, setMutatedUser] = useState<User | undefined>()
    const [mutatedError, setMutatedError] = useState<Error | null>()
    const { data: users, error, isFetching, isLoading, refetch } = useQuery<User[], Error>(['users'], getUsers, { refetchOnMount: true, refetchOnWindowFocus: false, retry: 1 })
    const { data: user, isFetching: isFetchingLazy, error: errorLazy, refetch: get } = useQuery<User, Error>(['user', { id: selectedGetId }], () => getUser(selectedGetId), { enabled: (selectedGetId > 0), refetchOnMount: false, refetchOnWindowFocus: false, retry: 1 })

    const options = {
        onMutate: () => {
            setIsMutating(true)
        },
        onSettled: (data: User | undefined, error: Error | null) => {
            setIsMutating(false)
            setMutatedError(error)
            setMutatedUser(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']).then()
            queryClient.invalidateQueries(['user', { id: selectedMutationId }]).then()
        },
    }

    const create = useMutation<User, Error, Omit<User, 'id'>>(['users'], args => createUser(args), { ...options })
    const update = useMutation<User, Error, User>(['users'], args => updateUser(args), { ...options })
    const patch = useMutation<User, Error, Optional<User, 'age' | 'name'>>(['users'], args => patchUser(args), { ...options })
    const remove = useMutation<void, Error, number>(['users'], id => deleteUser(id), {
        onMutate: () => {
            setIsMutating(true)
        },
        onSettled: (data: void, error: Error | null) => {
            setIsMutating(false)
            setMutatedError(error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']).then()
            queryClient.invalidateQueries(['user', { id: selectedMutationId }]).then()
        },
    })

    const Users = () => (
        <React.Fragment>
            {users?.map(user => (<div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>))}
        </React.Fragment>

    )

    const User = () => {
        if(errorLazy)
            return (<div className="danger">{`${t('rest-rtk.label.error')}: ${errorLazy?.message}`}</div>)

        if(user)
            return (<div>{`${user.id} - ${user.name} - ${user.age}`}</div>)

        return null
    }

    const MutatedResult = () => {
        if(mutatedError)
            return (<div className="danger">{`${t('rest-rtk.label.error')}: ${mutatedError?.message}`}</div>)

        if(mutatedUser)
            return (<div>{`${mutatedUser.id} - ${mutatedUser.name} - ${mutatedUser.age}`}</div>)

        return null
    }

    const MutationButton = ({ onClick, label }: MutationButtonProps) => (
        <Button
            className="m-1 w-75"
            disabled={isLoading || isFetching || isMutating}
            onClick={onClick}>
            {label}
        </Button>
    )

    return (
        <ErrorFallback
            className="d-flex justify-content-center m-1"
            error={error}
            onRetry={() => refetch() }>
            <div className="d-flex flex-row m-1">
                <Card className="w-25 me-1">
                    <div className="d-flex flex-column align-items-center">
                        <p>{t('rest-rtk.label.actions')}</p>
                        <div className="d-flex w-75">
                            <Button
                                className="m-1 w-75"
                                disabled={isLoading || isFetching || isFetchingLazy}
                                onClick={() => get()}>
                                {t('rest-rtk.button.get')}
                            </Button>
                            <input
                                className="text-black m-1 w-25"
                                value={selectedGetId}
                                type='number'
                                disabled={isMutating || isFetching || isFetchingLazy}
                                onChange={e => setSelectedGetId(Number(e.target.value))} />
                        </div>
                        <MutationButton
                            onClick={() => create.mutate({ age: 666, name: 'Estera' })}
                            label={t('rest-rtk.button.create')} />
                        <MutationButton
                            onClick={() => update.mutate({ id: selectedMutationId, age: 123, name: 'John' })}
                            label={t('rest-rtk.button.update')} />
                        <MutationButton
                            onClick={() => patch.mutate({ id: selectedMutationId, age: 7171 })}
                            label={t('rest-rtk.button.patch')} />
                        <MutationButton
                            onClick={() => remove.mutate(selectedMutationId)}
                            label={t('rest-rtk.button.delete')} />
                        <hr className="m-1 w-75" />
                        <label className="m-1 d-block">{t('rest-rtk.label.user-id')}</label>
                        <input
                            className="text-black m-1 w-75"
                            value={selectedMutationId}
                            type='number'
                            disabled={isMutating || isFetching || isFetchingLazy}
                            onChange={e => setSelectedMutationId(Number(e.target.value))} />
                    </div>
                </Card>
                <Card className="w-25 me-1">
                    <div className="d-flex flex-column align-items-center">
                        <p>{t('rest-rtk.label.results-mutation')}</p>
                        {isMutating ? <LoaderSmall /> : <MutatedResult />}
                    </div>
                </Card>
                <Card className="w-25 me-1">
                    <div className="d-flex flex-column align-items-center">
                        <p>{t('rest-rtk.label.results-lazy')}</p>
                        {isFetchingLazy ? <LoaderSmall /> : <User />}
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

export default RestRQ
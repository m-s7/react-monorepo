import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { User } from 'Core/business/types/user'
import { Card, Spinner, ErrorFallback } from '@ms7/ui'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getUser, getUsers, createUser, updateUser, patchUser, deleteUser } from 'Core/features/rest'
import { Optional } from '@ms7/common'
import { ReactQueryDevtools } from 'react-query/devtools'
import Form from 'react-bootstrap/Form'

interface MutationButtonProps {
    onClick: () => void,
    label: string,
}

export const RestRQ = () => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const [selectedGetId, setSelectedGetId] = useState(0)
    const [selectedMutationId, setSelectedMutationId] = useState(0)
    const [isMutating, setIsMutating] = useState(false)
    const [mutatedUser, setMutatedUser] = useState<User | undefined>()
    const [mutatedError, setMutatedError] = useState<Error | null>()
    const { data: users, error, isFetching, isLoading, refetch } = useQuery<User[], Error>(['users'], getUsers, { refetchOnMount: false, refetchOnWindowFocus: false, retry: false })
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
        <>
            {users?.map(user => (<div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>))}
        </>
    )

    const User = () => {
        if(errorLazy)
            return (<div className="danger">{`${t('rest-rq.label.error')}: ${errorLazy?.message}`}</div>)

        if(user)
            return (<div>{`${user.id} - ${user.name} - ${user.age}`}</div>)

        return null
    }

    const MutatedResult = () => {
        if(mutatedError)
            return (<div className="danger">{`${t('rest-rq.label.error')}: ${mutatedError?.message}`}</div>)

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
        <>
            <ErrorFallback
                className="d-flex justify-content-center"
                error={error}
                onRetry={() => refetch() }>
                <div className="d-flex w-100">
                    <Card className="w-25 me-1">
                        <div className="d-flex flex-column align-items-center">
                            <p>{t('rest-rq.label.actions')}</p>
                            <div className="d-flex w-75">
                                <Button
                                    className="m-1 w-75"
                                    disabled={isLoading || isFetching || isFetchingLazy}
                                    onClick={() => get()}>
                                    {t('rest-rq.button.get')}
                                </Button>
                                <Form.Control
                                    className="m-1 w-50"
                                    type="number"
                                    value={selectedGetId}
                                    disabled={isMutating || isFetching || isFetchingLazy}
                                    onChange={e => setSelectedGetId(Number(e.target.value))} />
                            </div>
                            <MutationButton
                                onClick={() => create.mutate({ age: 666, name: 'Estera' })}
                                label={t('rest-rq.button.create')} />
                            <MutationButton
                                onClick={() => update.mutate({ id: selectedMutationId, age: 123, name: 'John' })}
                                label={t('rest-rq.button.update')} />
                            <MutationButton
                                onClick={() => patch.mutate({ id: selectedMutationId, age: 7171 })}
                                label={t('rest-rq.button.patch')} />
                            <MutationButton
                                onClick={() => remove.mutate(selectedMutationId)}
                                label={t('rest-rq.button.delete')} />
                            <hr className="m-1 w-75" />
                            <Form.Label className="text-color-default">{t('rest-rq.label.user-id')}</Form.Label>
                            <Form.Control
                                className="m-1 w-75"
                                type="number"
                                value={selectedMutationId}
                                disabled={isMutating || isFetching || isFetchingLazy}
                                onChange={e => setSelectedMutationId(Number(e.target.value))} />
                        </div>
                    </Card>
                    <Card className="w-25 me-1">
                        <div className="d-flex flex-column align-items-center">
                            <p>{t('rest-rq.label.results-mutation')}</p>
                            {isMutating ? <Spinner /> : <MutatedResult />}
                        </div>
                    </Card>
                    <Card className="w-25 me-1">
                        <div className="d-flex flex-column align-items-center">
                            <p>{t('rest-rq.label.results-lazy')}</p>
                            {isFetchingLazy ? <Spinner /> : <User />}
                        </div>
                    </Card>
                    <Card className="w-25">
                        <div className="d-flex flex-column align-items-center">
                            <p>{t('rest-rq.label.results')}</p>
                            {(isLoading || isFetching) ? <Spinner /> : <Users />}
                        </div>
                    </Card>
                </div>
            </ErrorFallback>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    )
}

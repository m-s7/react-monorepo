import React, { useState } from 'react'
import { User } from 'Guide/business/types/user'
import { AxiosError } from '@ms7/restful-redux'
import { getUser, getUsers, patchUser, postUser, putUser, removeUser } from 'Guide/api/redux-user-api'
import { Button, LoaderSmall } from '@ms7/bui'
import { Card } from '@ms7/bui'
import {useTranslation} from "react-i18next";

type UserItem = User | User[]

const RestRedux = () => {
    const { t } = useTranslation()
    const [users, setUsers] = useState<UserItem>()
    const [error, setError] = useState<AxiosError>()
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        setIsLoading(true)
        setUsers(undefined)
        setError(undefined)

        await getUsers()
            .then(data => { setUsers(data) })
            .catch((error: AxiosError) => { setError(error) })
            .finally(() => { setIsLoading(false) })
    }

    const getDataOne = async (id: number) => {
        setIsLoading(true)
        setUsers(undefined)
        setError(undefined)

        await getUser(id)
            .then(data => { setUsers(data) })
            .catch((error: AxiosError) => { setError(error) })
            .finally(() => { setIsLoading(false) })
    }

    const postData = async () => {
        setIsLoading(true)
        setUsers(undefined)
        setError(undefined)

        await postUser({
            name: ['Avery', 'Grace', 'Chloe', 'Layla', 'Riley', 'Ellie', 'Alexa', 'Hazel', 'Sarah'][Math.floor(Math.random() * 9)],
            age: Math.floor(Math.random() * (100 - 1)) + 1,
        })
            .then(data => { setUsers(data) })
            .catch((error: AxiosError) => { setError(error) })
            .finally(() => { setIsLoading(false) })
    }

    const putData = async (id: number) => {
        setIsLoading(true)
        setUsers(undefined)
        setError(undefined)

        await putUser(id, {
            name: ['Avery', 'Grace', 'Chloe', 'Layla', 'Riley', 'Ellie', 'Alexa', 'Hazel', 'Sarah'][Math.floor(Math.random() * 9)],
            age: Math.floor(Math.random() * (100 - 1)) + 1,
        })
            .then(data => { setUsers(data) })
            .catch((error: AxiosError) => { setError(error) })
            .finally(() => { setIsLoading(false) })
    }

    const patchData = async (id: number) => {
        setIsLoading(true)
        setUsers(undefined)
        setError(undefined)

        await patchUser(id, {
            age: Math.floor(Math.random() * (10 - 1)) + 1,
        })
            .then(data => { setUsers(data) })
            .catch((error: AxiosError) => { setError(error) })
            .finally(() => { setIsLoading(false) })
    }

    const removeData = async (id: number) => {
        setIsLoading(true)
        setUsers(undefined)
        setError(undefined)

        await removeUser(id)
            .catch((error: AxiosError) => { setError(error) })
            .finally(() => { setIsLoading(false) })
    }

    const getNormalizedUsers = (): User[] => {
        if(!users) return []
        if(Array.isArray(users)) return users

        return [users]
    }

    return (
        <div className="d-flex flex-row m-1">
            <Card className="me-1 w-25">
                <div className="d-flex flex-column align-items-center">
                    <p>{t('rest-redux.label.actions')}</p>
                    <Button
                        className="m-1 w-75"
                        disabled={isLoading}
                        onClick={() => getData()}>
                        {t('rest-redux.button.get-all')}
                    </Button>
                    <Button
                        className="m-1 w-75"
                        disabled={isLoading}
                        onClick={() => getDataOne(Math.floor(Math.random() * 10))}>
                        {t('rest-redux.button.get-random')}
                    </Button>
                    <Button
                        className="m-1 w-75"
                        disabled={isLoading}
                        onClick={() => postData()}>
                        {t('rest-redux.button.create')}
                    </Button>
                    <Button
                        className="m-1 w-75"
                        disabled={isLoading}
                        onClick={() => putData(Math.floor(Math.random() * 10))}>
                        {t('rest-redux.button.change-data')}
                    </Button>
                    <Button
                        className="m-1 w-75"
                        disabled={isLoading}
                        onClick={() => patchData(Math.floor(Math.random() * 10))}>
                        {t('rest-redux.button.change-age')}
                    </Button>
                    <Button
                        className="m-1 w-75"
                        disabled={isLoading}
                        onClick={() => removeData(Math.floor(Math.random() * 10))}>
                        {t('rest-redux.button.remove')}
                    </Button>
                </div>
            </Card>
            <Card className="w-25">
                <div className="d-flex flex-column align-items-center">
                    <p>{t('rest-redux.label.results')}</p>
                    {error && 
                            <div
                                className="alert alert-danger"
                                role="alert">
                                {`${t('rest-redux.label.error')}: ${error.message}`}
                            </div>
                    }
                    {isLoading ? <LoaderSmall /> : getNormalizedUsers().map(user => (<div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>))}
                </div>
            </Card>
        </div>
    )
}

export default RestRedux
import React, { useState } from 'react'
import { User } from 'Guide/business/models/user/user'
import { AxiosError } from '@ms7/restful-redux'
import { getUser, getUsers, patchUser, postUser, putUser, removeUser } from 'Guide/api/user-api'
import { Button } from '@ms7/bui'

type UserItemData = User | User[]

const Rest = () => {
    const [users, setUsers] = useState<UserItemData>()
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
        <React.Fragment>
            <h5>{'Rest Example'}</h5>
            <div className="d-flex flex-row p-3">
                <div className="w-25">
                    <p>Actions</p>
                    <Button
                        className="d-block m-1"
                        disabled={isLoading}
                        onClick={() => getData()}>
                        {'get all users'}
                    </Button>
                    <Button
                        className="d-block m-1"
                        disabled={isLoading}
                        onClick={() => getDataOne(Math.floor(Math.random() * 10))}>
                        {'get random user'}
                    </Button>
                    <Button
                        className="d-block m-1"
                        disabled={isLoading}
                        onClick={() => postData()}>
                        {'create new user'}
                    </Button>
                    <Button
                        className="d-block m-1"
                        disabled={isLoading}
                        onClick={() => putData(Math.floor(Math.random() * 10))}>
                        {'change random user data'}
                    </Button>
                    <Button
                        className="d-block m-1"
                        disabled={isLoading}
                        onClick={() => patchData(Math.floor(Math.random() * 10))}>
                        {'change random user age'}
                    </Button>
                    <Button
                        className="d-block m-1"
                        disabled={isLoading}
                        onClick={() => removeData(Math.floor(Math.random() * 10))}>
                        {'remove random user'}
                    </Button>
                </div>
                <div>
                    <p>Results</p>
                    {error && <div className="danger">{`Error: ${error.message}`}</div>}
                    <React.Fragment>
                        {
                            getNormalizedUsers().map(user => (
                                <div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>),
                            )
                        }
                    </React.Fragment>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Rest
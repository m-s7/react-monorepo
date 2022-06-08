import React, { useState } from 'react'
import { Button } from '@ms7/bui'
import { getUsers, getUser, postUser, putUser, patchUser, removeUser } from 'Dummy/api/user-api'
import { AxiosError } from '@ms7/restful-redux'
import { User } from 'Dummy/business/models/user/user'
import { Card } from '@ms7/bui'

type UserItemData = User | User[]

const About = () => {
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
        <Card fillViewport={true}>
            <h1>{'Dummy About!'}</h1>
            <h5>{'User:'}</h5>
            <Button
                disabled={isLoading}
                onClick={() => getData()}>
                {'GET'}
            </Button>
            <Button
                disabled={isLoading}
                onClick={() => getDataOne(Math.floor(Math.random() * 10))}>
                {'GET1'}
            </Button>
            <Button
                disabled={isLoading}
                onClick={() => postData()}>
                {'POST'}
            </Button>
            <Button
                disabled={isLoading}
                onClick={() => putData(Math.floor(Math.random() * 10))}>
                {'PUT'}
            </Button>
            <Button
                disabled={isLoading}
                onClick={() => patchData(Math.floor(Math.random() * 10))}>
                {'PATCH'}
            </Button>
            <Button
                disabled={isLoading}
                onClick={() => removeData(Math.floor(Math.random() * 10))}>
                {'REMOVE'}
            </Button>
            <h5>{'Result:'}</h5>
            {error && <div>{`ERROR: ${error.message}`}</div>}
            <React.Fragment>
                {
                    getNormalizedUsers().map(user => (
                        <div key={user.id}>{`${user.id} - ${user.name} - ${user.age}`}</div>),
                    )
                }
            </React.Fragment>
        </Card>
    )
}

export default About
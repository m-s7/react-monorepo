import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { User } from 'Guide/business/models/user/user'
import { getUsers } from 'Guide/api/redux-user-api'
import CenteredLoader from 'Guide/components/centered-loader'

const UserViewer = () => {
    const handleError = useErrorHandler()
    const [users, setUsers] = useState<User[]>()

    useEffect(() => {
        setTimeout(() => {
            getUsers()
                .then(users => setUsers(users))
                .catch(error => handleError(error))
        }, 2500)
    }, [])

    if(users) {
        return (
            <ul>
                {users?.map(user => (
                    <li key={user.id}>
                        {`User: #${user.id}`}
                        <ul>
                            <li>{`Name: ${user.name}`}</li>
                            <li>{`Age: ${user.age}`}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        )
    }
    
    return (<CenteredLoader text={'Loading users...'} />)
}

export default UserViewer
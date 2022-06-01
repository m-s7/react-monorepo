import React from 'react'
import UserComponent from '@/components/pages/user'
import withAuth from '@/components/hoc/hoc-authenticate'

const User = () => (
    <UserComponent />
)

export default withAuth(User)

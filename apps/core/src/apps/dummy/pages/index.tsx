import React from 'react'
import IndexComponent from 'Dummy/components/pages'
import withAuth from '@/components/hoc/hoc-authenticate'

const Index = () => <IndexComponent />

export default withAuth(Index)
import React from 'react'
import StaticComponent from 'Dummy/components/pages/static'
import withAuth from '@/components/hoc/hoc-authenticate'

const Static = () => <StaticComponent />

export default withAuth(Static)

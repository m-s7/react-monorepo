import React from 'react'
import CounterComponent from 'Dummy/components/pages/counter'
import withAuth from '@/components/hoc/hoc-authenticate'

const Counter = () => <CounterComponent />

export default withAuth(Counter)
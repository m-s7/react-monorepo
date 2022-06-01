import React from 'react'
import AboutComponent from '@/components/pages/about'
import withAuth from '@/components/hoc/hoc-authenticate'

const About = () => (
    <AboutComponent />
)

export default withAuth(About)

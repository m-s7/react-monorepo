import React from 'react'
import AboutComponent from 'Dummy/components/pages/about'
import withAuth from '@/components/hoc/hoc-authenticate'

const About = () => <AboutComponent />

export default withAuth(About)
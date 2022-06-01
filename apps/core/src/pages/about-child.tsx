import React from 'react'
import AboutChildComponent from '@/components/pages/about-child'
import withAuth from '@/components/hoc/hoc-authenticate'

const AboutChild = () => (
    <AboutChildComponent />
)

export default withAuth(AboutChild)

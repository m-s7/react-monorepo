import React from 'react'
import AboutOtherComponent from '@/components/pages/about-other'
import withAuth from '@/components/hoc/hoc-authenticate'

const AboutOther = () => (
    <AboutOtherComponent />
)

export default withAuth(AboutOther)

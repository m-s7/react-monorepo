import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RouterLink } from '../lib/router-link'
import { BrowserRouter } from 'react-router-dom'

export default {
    title: 'BUI/Core/RouterLink',
    component: RouterLink,
} as ComponentMeta<typeof RouterLink>

const Template: ComponentStory<typeof RouterLink> = args => <BrowserRouter><RouterLink {...args} /></BrowserRouter>

export const Base = Template.bind({})
Base.args = {
    to: '/',
    variant: 'primary',
    children: 'Test',
}

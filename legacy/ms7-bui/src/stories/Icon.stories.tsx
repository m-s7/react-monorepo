import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Icon } from '../lib/icon'

export default {
    title: 'BUI/Core/Icon',
    component: Icon,
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />

export const Base = Template.bind({})
Base.args = {
    variant: 'home',
    size: 'sm',

}

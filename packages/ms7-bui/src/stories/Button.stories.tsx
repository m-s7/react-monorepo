import { expect } from '@storybook/jest'
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'


import { Button } from '../lib/button'
import { userEvent, within } from '@storybook/testing-library'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/Button',
    component: Button,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = args => <Button {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    variant: 'primary',
    size: 'sm',
    children: 'Button',
}
Primary.play = async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onClick).toHaveBeenCalled()
}

export const Secondary = Template.bind({})
Secondary.args = {
    variant: 'secondary',
    size: 'sm',
    children: 'Button',
}

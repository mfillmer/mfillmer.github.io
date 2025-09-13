import { fn } from 'storybook/test'
import React from 'react'
import { Button } from '../components/ui/button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: ({ label }) => {
    return <Button>{label}</Button>
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    label: { control: 'text' },
    onClick: { action: 'onClick' },
    primary: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
  args: { onClick: fn() },
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
}

export const Secondary = {
  args: {
    label: 'Button',
  },
}

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
}

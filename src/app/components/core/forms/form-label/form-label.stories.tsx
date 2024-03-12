import type { Meta, StoryObj } from '@storybook/react';
import FormLabel from './form-label';

const meta = {
  title: 'Components/Core/Forms/FormsLabel',
  component: FormLabel,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    intent: {
        control: 'radio',
        options: ['primary', 'secondary'],
    },
    fontbold: { control: 'boolean' },
    for: { control: 'text' },
    children: { control: 'text' }
  },
  args: {
    intent: 'primary',
    fontbold: false,
    for: 'username',
    children: 'Username'
  },
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BoldPrimaryLabel: Story = {
    args: {
        intent: 'primary',
        fontbold: true,
        for: 'username',
        children: 'Username'
      }
  };

export const OrdinarySecondaryLabel: Story = {
    args: {
        intent: 'secondary',
        fontbold: false,
        for: 'username',
        children: 'Username'
    }
};
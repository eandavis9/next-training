import type { Meta, StoryObj } from '@storybook/react';
import RadioButton from './radio-button';

const meta = {
  title: 'Components/Core/RadioButton',
  component: RadioButton,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'radio',
      options: ['primary', 'secondary', 'disabled'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    disabled: false,
    intent: 'primary',
    items: ['Radio Item 1'],
  },
};

export const Secondary: Story = {
  args: {
    disabled: false,
    intent: 'secondary',
    items: ['Radio Item 1'],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    intent: 'disabled',
    items: ['Radio Item 1'],
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

const meta = {
  title: 'Components/Core/Button',
  component: Button,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'radio',
      options: ['primary', 'secondary', 'link'],
    },
    fullWidth: { control: 'boolean' },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
    leftIcon: { control: 'boolean' },
    rightIcon: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    buttontype: {
      control: 'radio',
      options: ['button', 'submit'],
    }
  },
  args: {
    label: 'Button',
    children: <Squares2X2Icon></Squares2X2Icon>,
    fullWidth: false,
    disabled: false,
    leftIcon: true,
    rightIcon: false,
    isLoading: false,
    buttontype: 'button'
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLarge: Story = {
  args: {
    intent: 'primary',
    size: 'lg',
  },
};

export const PrimaryMedium: Story = {
  args: {
    intent: 'primary',
    size: 'md',
  },
};

export const PrimarySmall: Story = {
  args: {
    intent: 'primary',
    size: 'sm',
  },
};

export const SecondaryLarge: Story = {
  args: {
    intent: 'secondary',
    size: 'lg',
  },
};

export const SecondaryMedium: Story = {
  args: {
    intent: 'secondary',
    size: 'md',
  },
};

export const SecondarySmall: Story = {
  args: {
    intent: 'secondary',
    size: 'sm',
  },
};

export const LinkLarge: Story = {
  args: {
    intent: 'link',
    size: 'lg',
  },
};

export const LinkMedium: Story = {
  args: {
    intent: 'link',
    size: 'md',
  },
};

export const LinkSmall: Story = {
  args: {
    intent: 'link',
    size: 'sm',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './textarea';
import {
  ExclamationCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

const meta = {
  title: 'Components/Core/TextArea',
  component: TextArea,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'radio', options: ['active', 'default', 'error'] },
    label: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    rightIcon: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
  args: {
    rightIcon: false,
    icon: <PencilSquareIcon></PencilSquareIcon>,
    errorMessage: 'Error message here',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    intent: 'default',
    label: 'Default Message:',
    placeholder: 'Please write your message here...',
    fullWidth: false,
    disabled: false,
    rightIcon: true,
  },
};

export const Disabled: Story = {
  args: {
    intent: 'default',
    label: 'Disabled Message:',
    placeholder: 'Please write your message here...',
    fullWidth: false,
    disabled: true,
    rightIcon: true,
  },
};

export const Active: Story = {
  args: {
    intent: 'active',
    label: 'Active Message:',
    placeholder: 'Please write your message here...',
    fullWidth: false,
    disabled: false,
    rightIcon: true,
  },
};

export const Error: Story = {
  args: {
    intent: 'error',
    label: 'Error Message:',
    placeholder: 'Please write your message here...',
    errorMessage: 'This is an error message',
    icon: <ExclamationCircleIcon></ExclamationCircleIcon>,
    fullWidth: false,
    disabled: false,
    rightIcon: true,
  },
};

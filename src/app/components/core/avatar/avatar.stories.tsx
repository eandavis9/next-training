import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './avatar';

const meta = {
  title: 'Components/Core/Avatar',
  component: Avatar,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    noLabel: { control: 'boolean' },
    intent: { control: 'radio', options: ['image', 'text', 'icon'] },
  },
  args: {
    intent: 'image',
    noLabel: false,
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

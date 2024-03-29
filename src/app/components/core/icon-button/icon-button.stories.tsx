import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './icon-button';
import { BellIcon } from '@heroicons/react/24/outline';

const meta = {
  title: 'Components/Core/IconButton',
  component: IconButton,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    dot: { control: 'boolean' },
    intent: { control: 'radio', options: ['primary', 'secondary'] },
    shape: { control: 'radio', options: ['round', 'square'] },
  },
  args: {
    dot: false,
    intent: 'primary',
    shape: 'round',
    children: <BellIcon></BellIcon>,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

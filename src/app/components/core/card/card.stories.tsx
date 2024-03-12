import type { Meta, StoryObj } from '@storybook/react';
import Card from './card';

const meta = {
  title: 'Components/Core/Card',
  component: Card,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
  },
  args: {
    heading: 'Noteworthy technology acquisitions 2021',
    body: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    intent: 'vertical',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

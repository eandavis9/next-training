import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './dropdown';
import {
  ArchiveBoxIcon,
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const meta = {
  title: 'Components/Core/Dropdown',
  component: Dropdown,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'radio',
      options: ['default', 'custom'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    items: { control: 'array' },
    header: { control: 'text' },
    label: { control: 'text' },
    rightIcon: { control: 'boolean' },
    nolabel: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    header: 'Headers',
    rightIcon: true,
    disabled: false,
    nolabel: false,
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    intent: 'default',
    header: 'Settings',
    headerIcon: <Cog6ToothIcon></Cog6ToothIcon>,
    items: [
      {
        icon: <PencilIcon></PencilIcon>,
        label: 'Edit',
      },
      {
        icon: <DocumentDuplicateIcon></DocumentDuplicateIcon>,
        label: 'Duplicate',
      },
      {
        icon: <ArchiveBoxIcon></ArchiveBoxIcon>,
        label: 'Archive',
      },
      {
        icon: <ArrowTopRightOnSquareIcon></ArrowTopRightOnSquareIcon>,
        label: 'Move',
      },
      {
        icon: <TrashIcon></TrashIcon>,
        label: 'Delete',
      },
    ],
    fullWidth: false,
    disabled: false,
  },
};

export const Custom: Story = {
  args: {
    intent: 'custom',
    header: 'Settings',
    headerIcon: <Cog6ToothIcon></Cog6ToothIcon>,
    items: [
      {
        icon: <PencilIcon></PencilIcon>,
        label: 'Edit',
      },
      {
        icon: <DocumentDuplicateIcon></DocumentDuplicateIcon>,
        label: 'Duplicate',
      },
      {
        icon: <ArchiveBoxIcon></ArchiveBoxIcon>,
        label: 'Archive',
      },
      {
        icon: <ArrowTopRightOnSquareIcon></ArrowTopRightOnSquareIcon>,
        label: 'Move',
      },
      {
        icon: <TrashIcon></TrashIcon>,
        label: 'Delete',
      },
    ],
    fullWidth: false,
    disabled: false,
    rightIcon: true,
  },
};
import type { Meta, StoryObj } from '@storybook/react';
import TextField from './textfield';
import { ExclamationCircleIcon, EyeIcon, LockClosedIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/24/outline';

const meta = {
    title: 'Components/Core/TextField',
    component: TextField,
    parameters: {},
    tags: ['autodocs'],
    argTypes: {
        intent: {
            control: 'radio',
            options: ['default', 'active', 'error'],
        },
        fieldType: {
            control: 'radio',
            options: ['text', 'email', 'password'],
        },
        name: { control: 'text' },
        label: { control: 'text'},
        errorMessage: { control: 'text' },
        fullWidth: { control: 'boolean' },
        disabled: { control: 'boolean' },
        leftIcon: { control: 'boolean' },
        rightIcon: { control: 'boolean' },
        nolabel: { control: 'boolean' },
    },
    args: {
        fullWidth: false,
        disabled: false,
        leftIcon: true,
        rightIcon: true,
        label: 'TextField',
        name: 'textfield',
        fieldType: 'text',
        lefticonblock: <UserIcon></UserIcon>,
        righticonblock: <PencilSquareIcon></PencilSquareIcon>,
        errorMessage: 'Error message here',
        nolabel: false
      },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        intent: 'default',
        label: 'Username',
        placeholder: 'Enter username here...',
        lefticonblock: <UserIcon></UserIcon>,
        righticonblock: <PencilSquareIcon></PencilSquareIcon>,
        fullWidth: false,
        leftIcon: true,
        rightIcon: true,
        disabled: false,
        name: 'username',
        fieldType: 'text',
    }
};

export const Password: Story = {
    args: {
        intent: 'active',
        label: 'Password',
        placeholder: 'Password',
        lefticonblock: <LockClosedIcon></LockClosedIcon>,
        righticonblock: <EyeIcon></EyeIcon>,
        fullWidth: false,
        leftIcon: true,
        rightIcon: true,
        disabled: false,
        name: 'password',
        fieldType: 'password',
    }
};

export const Error: Story = {
    args: {
        intent: 'error',
        label: 'Username',
        placeholder: 'Error Placeholder',
        errorMessage: 'This is an error message',
        lefticonblock: <LockClosedIcon></LockClosedIcon>,
        righticonblock: <ExclamationCircleIcon></ExclamationCircleIcon>,
        fullWidth: false,
        disabled: false,
        name: 'username',
        fieldType: 'email',
    }
};
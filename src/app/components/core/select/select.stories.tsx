import type { Meta, StoryObj } from '@storybook/react';
import Select from './select';
import { AcademicCapIcon, CircleStackIcon, TvIcon, UserIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/20/solid';

const meta = {
    title: 'Components/Core/Select',
    component: Select,
    parameters: {},
    tags: ['autodocs'],
    argTypes: {
        intent: { 
            control: 'radio', 
            options: [
                'default', 
                'custom', 
            ] 
        },
        fullWidth: { control: 'boolean' },
        disabled: { control: 'boolean' },
        nolabel: { control: 'boolean' },
        leftIcon: { control: 'boolean' },
        label: { control: 'text' },
    },
    args: {
        intent: 'default',
        label: 'Selection',
        nolabel: false,
        disabled: false,
        fullWidth: false,
        leftIcon: true,
        labelIcon: <UserIcon/>
    }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        intent: 'default',
        label: "Selection",
        items: [
           { id: 1, name: "Selected Item 1", icon: <CircleStackIcon />  },
           { id: 2, name: "Selected Item 2", icon: <XCircleIcon />   },
           { id: 3, name: "Selected Item 3", icon: <TvIcon />   },
           { id: 4, name: "Selected Item 4", icon: <LockClosedIcon />   },
           { id: 5, name: "Selected Item 5", icon: <AcademicCapIcon />   },
        ],
        fullWidth: false,
        disabled: false,
        nolabel: false,
        leftIcon: true,
    }
};

export const Custom: Story = {
    args: {
        intent: 'custom',
        label: "Selection",
        items: [
            { id: 1, name: "Selected Item 1", icon: <CircleStackIcon />  },
            { id: 2, name: "Selected Item 2", icon: <XCircleIcon />   },
            { id: 3, name: "Selected Item 3", icon: <TvIcon />   },
            { id: 4, name: "Selected Item 4", icon: <LockClosedIcon />   },
            { id: 5, name: "Selected Item 5", icon: <AcademicCapIcon />   },
        ],
        fullWidth: false,
        disabled: false,
        nolabel: false,
        leftIcon: true,
    }
};
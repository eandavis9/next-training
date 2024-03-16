import type { Meta, StoryObj } from '@storybook/react';
import FormGroup from './form-group';
import FormLabel from '../form-label/form-label';

const meta = {
  title: 'Components/Core/Forms/FormGroup',
  component: FormGroup,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    intent: {
        control: 'radio',
        options: ['primary', 'secondary']
    }
  },
  args: {
    intent: 'primary',
    children: 
        <>
            <FormLabel
                fontbold
                for="username"
                intent="primary"
            >
                Sample Label with Form Group
            </FormLabel>
        </>
  },
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryFormGroup: Story = {
    args: {
        intent: 'primary',
        children: 
            <>
                <FormLabel
                    fontbold
                    for="username"
                    intent="primary"
                >
                    Sample Label with Form Group
                </FormLabel>
            </>
    }
};

export const SecondaryFormGroup: Story = {
    args: {
        intent: 'secondary',
            children: 
                <>
                    <FormLabel
                        fontbold
                        for="username"
                        intent="secondary"
                    >
                        Sample Label with Form Group
                    </FormLabel>
                </>
    }
};
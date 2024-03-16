/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from '@storybook/react';
import Grid from './grid';
import TextField from '../textfield/textfield';
import {
  EyeIcon,
  LockClosedIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  UserIcon,
} from '@heroicons/react/20/solid';
import Button from '../button/button';

const meta = {
  title: 'Components/Core/Grid',
  component: Grid,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'radio',
      options: ['col1', 'col2', 'col3'],
    },
  },
  args: {
    intent: 'col1',
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryGrid: Story = {
  args: {
    intent: 'col1',
    children: (
      <>
        <Grid intent='col2'>
          <img
            className='mx-auto my-6 h-16 w-auto'
            src='static/media/public/images/img-logo-colored.svg'
            alt='logo'
          />
          <TextField
            name='username'
            errorMessage='Error message here'
            intent='default'
            label='Username'
            leftIcon
            lefticonblock={<UserIcon />}
            placeholder='Enter username here...'
            rightIcon
            righticonblock={<PencilSquareIcon />}
          />
          <TextField
            name='password'
            errorMessage='Error message here'
            intent='active'
            label='Password'
            leftIcon
            lefticonblock={<LockClosedIcon />}
            placeholder='Password'
            rightIcon
            righticonblock={<EyeIcon />}
          />
          <Button
            buttontype='button'
            fullWidth
            intent='primary'
            label='Button'
            leftIcon
            size='lg'
          >
            <Squares2X2Icon />
          </Button>
        </Grid>
      </>
    ),
  },
};

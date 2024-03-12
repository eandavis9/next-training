import type { Meta, StoryObj } from '@storybook/react';
import PatientFormModal from './patient-form-modal'; 

const meta = {
  title: 'PatientFormModal',
  component: PatientFormModal,
} satisfies Meta<typeof PatientFormModal>;

export default meta;
type Story = StoryObj<typeof meta>;
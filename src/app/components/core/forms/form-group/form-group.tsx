import { VariantProps, cva } from 'class-variance-authority';
import { ReactNode } from 'react';

const formGroupVariants = cva('mb-4 flex-grow', {
  variants: {
    intent: {
      primary: '',
      secondary: 'bg-primary-200',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

interface FormGroupProps extends VariantProps<typeof formGroupVariants> {
  children?: ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ intent, ...props }) => {
  return (
    <>
      <div className={formGroupVariants({ intent })}>{props.children}</div>
    </>
  );
};

export default FormGroup;

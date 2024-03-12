import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';

const iconButtonVariants = cva(
  'w-10 h-10 relative flex items-center justify-center',
  {
    variants: {
      intent: {
        primary: 'bg-primary',
        secondary: 'bg-secondary-50',
      },
      shape: {
        square: 'rounded-md',
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      intent: 'primary',
      shape: 'round',
    },
  }
);

const iconButtonImageVariants = cva(' h-6 w-6', {
  variants: {
    intent: {
      primary: 'text-secondary-white',
      secondary: 'text-secondary-300',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

interface IconButtonProps extends VariantProps<typeof iconButtonVariants> {
  dot?: boolean;
  children: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  intent,
  shape,
  children,
  ...props
}) => {
  return (
    <div className='relative h-10 w-10'>
      <div className={iconButtonVariants({ intent, shape })}>
        <div className={iconButtonImageVariants({ intent })}>{children}</div>
        {props.dot && (
          <div className='absolute left-[20px] top-[9px] h-1.5 w-1.5 rounded-full bg-danger' />
        )}
      </div>
    </div>
  );
};

export default IconButton;

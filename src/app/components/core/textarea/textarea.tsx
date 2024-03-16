import React, { ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const containerVariants = cva('flex flex-col gap-1', {
  variants: {
    intent: {
      default: '',
      active: '',
      error: '',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
    disabled: {
      true: 'cursor-not-allowed',
    },
  },
  defaultVariants: {
    intent: 'default',
    fullWidth: false,
    disabled: false,
  },
});

const labelVariants = cva(
  'flex items-center relative font-medium text-sm tracking-wide',
  {
    variants: {
      intent: {
        default: 'text-secondary-400',
        active: 'text-primary',
        error: 'text-danger',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'cursor-not-allowed',
      },
    },
    defaultVariants: {
      intent: 'default',
      fullWidth: false,
      disabled: false,
    },
  }
);

const contentVariants = cva('relative', {
  variants: {
    intent: {
      default: '',
      active: '',
      error: '',
    },

    fullWidth: {
      true: 'w-full',
      false: 'w-full',
    },

    disabled: {
      true: '',
    },
  },
  defaultVariants: {
    intent: 'default',
    disabled: false,
    fullWidth: false,
  },
});

const textAreaVariants = cva(
  'flex w-full outline-none items-center justify-between gap-2 rounded-md border py-3 px-4 text-secondary bg-secondary-white placeholder:text-secondary-200 focus:ring-2 focus:ring-inset focus:ring-primary-300 text-base sm:leading-6',
  {
    variants: {
      intent: {
        default: 'border-secondary-200',
        active: 'border-primary',
        error: 'border-danger',
      },

      fullWidth: {
        true: 'w-full',
      },

      disabled: {
        true: 'bg-secondary-100 cursor-not-allowed',
      },
    },
    defaultVariants: {
      intent: 'default',
      disabled: false,
      fullWidth: false,
    },
  }
);

const iconVariants = cva('h-5 w-5', {
  variants: {
    intent: {
      default: 'text-secondary-300',
      active: 'text-primary',
      error: 'text-danger',
    },
    size: {
      lg: 'h-6 w-6',
      md: 'h-4 w-4',
      sm: 'h-3 w-3',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    intent: 'default',
    size: 'md',
    disabled: false,
  },
});

const errorVariants = cva('text-danger py-1 px-1 text-sm rounded-sm relative', {
  variants: {
    intent: {
      default: '',
      active: '',
      error: '',
    },
    fullWidth: {
      true: 'w-full',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    intent: 'default',
    disabled: false,
  },
});

interface TextAreaProps extends VariantProps<typeof containerVariants> {
  label: string;
  placeholder: string;
  rightIcon?: boolean;
  icon: ReactNode;
  errorMessage?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  intent,
  fullWidth,
  disabled,
  icon,
  ...props
}) => {
  return (
    <div className={containerVariants({ intent, fullWidth, disabled })}>
      <label
        htmlFor='label'
        className={labelVariants({ intent, fullWidth, disabled })}
      >
        {props.label}
      </label>

      <div className={contentVariants({ intent, fullWidth, disabled })}>
        <textarea
          disabled={!!disabled}
          className={textAreaVariants({ intent, fullWidth, disabled })}
          placeholder={props.placeholder}
        ></textarea>
        <div className='absolute bottom-3 right-3'>
          {props.rightIcon && !!icon && (
            <div className=''>
              <div className={iconVariants({ intent, disabled })}>{icon}</div>
            </div>
          )}
        </div>
      </div>

      <div
        hidden={intent !== 'error'}
        className={errorVariants({ intent, fullWidth })}
        role='alert'
      >
        <span hidden={intent !== 'error'} className='text-sm'>
          {props.errorMessage}
        </span>
        <span
          hidden={intent !== 'error'}
          className='absolute bottom-0 right-0 top-0 px-4 py-3'
        ></span>
      </div>
    </div>
  );
};

export default TextArea;

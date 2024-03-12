import React, { ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';

const textfieldContainerVariants = cva('flex flex-col gap-1', {
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
  },
  defaultVariants: {
    intent: 'default',
    fullWidth: false,
  },
});

const textfieldVariants = cva(
  'flex items-center justify-between gap-2 rounded-md border py-3 px-4 bg-secondary-white focus-within:ring-2 focus-within:ring-primary-300',
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
    },
    defaultVariants: {
      intent: 'default',
      fullWidth: false,
    },
  }
);

const textfieldLabelVariants = cva(
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
    },
    defaultVariants: {
      intent: 'default',
      fullWidth: false,
    },
  }
);

const textfieldInputVariants = cva(
  'group w-full outline-none text-secondary placeholder:text-secondary-200 text-base sm:leading-6',
  {
    variants: {
      intent: {
        default: 'text-secondary-900',
        active: 'text-primary',
        error: 'text-danger',
      },
      fullWidth: {
        true: 'w-full',
      },
      leftIcon: {
        true: 'flex justify-start',
      },
      rightIcon: {
        true: 'flex justify-end',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      intent: 'default',
      fullWidth: false,
      disabled: false,
    },
  }
);

const textIconVariants = cva('relative flex w-5 h-5', {
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

const textErrorVariants = cva(
  'w-full text-danger py-1 px-1 text-sm rounded-sm relative',
  {
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
  }
);

interface TextFieldProps extends VariantProps<typeof textfieldInputVariants> {
  name: string;
  label?: string;
  nolabel?: boolean;
  placeholder: string;
  lefticonblock?: ReactNode;
  righticonblock?: ReactNode;
  leftIcon?: boolean;
  rightIcon?: boolean;
  fieldType?: 'text' | 'email' | 'password';
  errorMessage?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  intent,
  fullWidth,
  disabled,
  lefticonblock,
  righticonblock,
  ...props
}) => {
  return (
    <div className={textfieldContainerVariants({ intent, fullWidth })}>
      <div hidden={!!props.nolabel}>
        <label className={textfieldLabelVariants({ intent, fullWidth })}>
          {props.label}
        </label>
      </div>

      <div className={textfieldVariants({ intent, fullWidth })}>
        {props.leftIcon && !!lefticonblock && (
          <div className={textIconVariants({ intent, disabled })}>
            {lefticonblock}
          </div>
        )}

        <input
          name={props.name}
          type={props.fieldType}
          disabled={!!disabled}
          placeholder={
            props.fieldType === 'password' ? '**********' : props.placeholder
          }
          className={textfieldInputVariants({
            intent,
            disabled,
            leftIcon: props.leftIcon,
            rightIcon: props.rightIcon,
          })}
        />

        {props.rightIcon && !!righticonblock && (
          <div className={textIconVariants({ intent, disabled })}>
            {righticonblock}
          </div>
        )}
      </div>

      <div
        hidden={intent !== 'error'}
        className={textErrorVariants({ intent, fullWidth })}
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

export default TextField;

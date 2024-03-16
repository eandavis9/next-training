import React from 'react';
import { cva } from 'class-variance-authority';

const selectContainerVariants = cva('flex flex-col gap-1 select-wrapper', {
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

const selectVariants = cva(
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

const selectInputVariants = cva(
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

const selectIconVariants = cva('relative flex w-5 h-5', {
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

const selectErrorVariants = cva(
  'w-full text-danger py-1 px-1 rounded-sm relative',
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

interface SelectFieldProps {
  name: string;
  value: string; // Add value prop
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  intent?: 'default' | 'active' | 'error';
  fullWidth?: boolean;
  disabled?: boolean;
  errorMessage?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  value, // Destructure value prop
  onChange,
  intent = 'default',
  fullWidth = false,
  disabled = false,
  errorMessage,
  children,
}) => {
  return (
    <div className={selectContainerVariants({ intent, fullWidth })}>
      <div className={selectVariants({ intent, fullWidth })}>
        <select
          name={name}
          value={value} // Pass value prop to select element
          onChange={onChange}
          className={selectInputVariants({ intent, disabled })}
          disabled={disabled}
        >
          {children}
        </select>
      </div>

      <div hidden={intent !== 'error'} className={selectErrorVariants({ intent, fullWidth })} role='alert'>
        <span hidden={intent !== 'error'} className='error-message block text-sm sm:inline'>
          {errorMessage}
        </span>
        <span hidden={intent !== 'error'} className='absolute bottom-0 right-0 top-0 px-4 py-3'></span>
      </div>
    </div>
  );
};

export default SelectField;
import React, { ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import Spinner from '../spinner/spinner';

const buttonVariants = cva('rounded-md flex justify-center items-center', {
  variants: {
    intent: {
      primary: 'bg-primary',
      cancel: 'bg-cancel',
      secondary: 'border-primary border-solid border-2',
      link: '',
      add: 'add-button',
    },
    size: {
      lg: 'px-5 py-3 gap-2',
      md: 'px-4 py-2 gap-3',
      sm: 'px-4 py-2 gap-2 rounded-sm',
    },
    fullWidth: {
      true: 'w-full',
      false: 'h-fit w-fit',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
    isLoading: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
  },
});

const buttonLabelVariants = cva('font-semibold', {
  variants: {
    intent: {
      primary: 'text-secondary-50',
      secondary: 'text-primary',
      link: 'text-primary',
      cancel: 'text-white',
      add: 'text-white'
    },
    size: {
      lg: 'text-base',
      md: 'text-base',
      sm: 'text-sm',
    },
    leftIcon: {
      true: 'flex justify-start',
    },
    rightIcon: {
      true: 'flex justify-end',
    },
    disabled: {
      true: '',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    disabled: false,
  },
});

const buttonIconVariants = cva('', {
  variants: {
    intent: {
      primary: 'text-secondary-50',
      secondary: 'text-primary',
      link: 'text-primary',
      add: 'text-white'
    },
    size: {
      lg: 'h-6 w-6',
      md: 'h-4 w-4',
      sm: 'h-3 w-3',
    },
    disabled: {
      true: '',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    disabled: false,
  },
});

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label: string;
  buttontype: 'button' | 'submit';
  children?: ReactNode;
  leftIcon?: boolean;
  rightIcon?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  fullWidth,
  disabled,
  isLoading,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      type={props.buttontype}
      className={buttonVariants({
        intent,
        size,
        fullWidth,
        disabled,
        isLoading,
      })}
      disabled={!!disabled || isLoading}
      {...props}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      aria-label='button'
    >
      {props.leftIcon && !isLoading && !!children && (
        <div className={buttonIconVariants({ intent, size })}>{children}</div>
      )}

      {isLoading && <Spinner nolabel size='sm' />}

      <div
        className={buttonLabelVariants({
          intent,
          size,
          leftIcon: props.leftIcon,
          rightIcon: props.leftIcon,
        })}
      >
        {props.label}
      </div>
      {props.rightIcon && !!children && (
        <div className={buttonIconVariants({ intent, size })}>{children}</div>
      )}
    </button>
  );
};

export default Button;

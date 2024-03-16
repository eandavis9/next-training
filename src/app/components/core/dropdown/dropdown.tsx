import React, { ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Menu } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const menuContainerVariants = cva('flex flex-col gap-1 relative', {
  variants: {
    intent: {
      default: '',
      custom: '',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-fit',
    },
    disabled: {
      true: 'bg-slate-200 opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    intent: 'default',
    fullWidth: false,
    disabled: false,
  },
});

const menuLabelVariants = cva(
  'flex text-secondary-400 items-center relative font-medium text-sm tracking-wide',
  {
    variants: {
      intent: {
        default: '',
        custom: '',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'bg-slate-200 opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      intent: 'default',
      fullWidth: false,
      disabled: false,
    },
  }
);

const menuVariants = cva('', {
  variants: {
    intent: {
      default: '',
      custom: '',
    },
    fullWidth: {
      true: 'w-full',
    },
    disabled: {
      true: 'bg-slate-200 opacity-50 cursor-not-allowed',
    },
  },
  defaultVariants: {
    intent: 'default',
    fullWidth: false,
    disabled: false,
  },
});

const menuButtonsVariants = cva(
  'flex gap-2  items-center rounded-md outline-none text-base sm:leading-6',
  {
    variants: {
      intent: {
        default: 'border bg-secondary-white border-secondary-200 py-3 px-4',
        custom: 'border-none bg-secondary-50 py-3 px-4',
      },
      fullWidth: {
        true: 'w-full justify-between',
      },
      disabled: {
        true: 'bg-slate-200 opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      intent: 'default',
      fullWidth: false,
      disabled: false,
    },
  }
);

const menuItemsVariants = cva(
  'absolute mt-0 ml-0 rounded-md border bg-secondary-white border-secondary-100 shadow-md',
  {
    variants: {
      intent: {
        default: '',
        custom: '',
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

const itemVariants = cva(
  'flex gap-2 items-center px-4 py-2 text-secondary text-base hover:bg-secondary-50',
  {
    variants: {
      intent: {
        default: 'text-secondary-900',
        custom: 'text-primary',
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

const iconVariants = cva(
  'relative inline-flex text-gray-400 focus-within:text-gray-600',
  {
    variants: {
      intent: {
        default: 'text-secondary-300',
        custom: 'text-secondary-300',
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
  }
);

interface DropdownProps extends VariantProps<typeof menuVariants> {
  header: string;
  headerIcon: ReactNode;
  label?: string;
  nolabel?: boolean;
  rightIcon?: boolean;
  items: { icon: ReactNode; label: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({
  intent,
  fullWidth,
  disabled,
  rightIcon,
  ...props
}) => {
  return (
    <div className={menuContainerVariants({ intent, fullWidth, disabled })}>
      <div hidden={!!props.nolabel}>
        <label className={menuLabelVariants({ intent, fullWidth, disabled })}>
          {props.label}
        </label>
      </div>

      <Menu as='div' className={menuVariants({ intent, fullWidth, disabled })}>
        <Menu.Button
          disabled={!!disabled}
          className={menuButtonsVariants({ intent, fullWidth, disabled })}
        >
          {props.header}
          {rightIcon && !!props.headerIcon && (
            <span className={iconVariants({ intent, disabled })}>
              {props.headerIcon}
            </span>
          )}
        </Menu.Button>
        <Menu.Items
          className={menuItemsVariants({ intent, fullWidth, disabled })}
        >
          <div className='py-1'>
            {props.items.map((item, index) => (
              <Menu.Item key={index}>
                <a
                  href='#'
                  className={itemVariants({ intent, fullWidth, disabled })}
                >
                  {rightIcon && !!item.icon && (
                    <span className={iconVariants({ intent, disabled })}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </a>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Dropdown;

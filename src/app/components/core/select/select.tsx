import React, { ReactNode, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { Listbox } from '@headlessui/react';

const listboxVariants = cva('flex flex-col relative', {
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

const labelVariants = cva(
  'flex text-secondary-400 items-center relative font-medium text-sm tracking-wide mb-1',
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

const buttonVariants = cva(
  'flex items-center justify-between gap-4 rounded-md border py-3 px-4 text-secondary placeholder:text-secondary-200 focus:ring-2 focus:ring-inset focus:ring-primary-300 text-base sm:leading-6',
  {
    variants: {
      intent: {
        default: 'bg-secondary-white border-secondary-200',
        custom:
          'rounded-none border-b border-t-0 border-l-0 border-r-0 border-secondary-200 px-0',
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

const optionsVariants = cva(
  'absolute mt-0 ml-0 rounded-md border border-secondary-100 bg-secondary-white shadow-md ',
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

const optionVariants = cva(
  'relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-secondary-50',
  {
    variants: {
      intent: {
        default: 'text-secondary-700',
        custom: 'text-primary-700',
      },
      active: {
        true: 'bg-cyan-500 text-white',
      },
    },
    defaultVariants: {
      intent: 'default',
      active: false,
    },
  }
);

const iconVariants = cva('inline-flex pt-2 h-6 w-6', {
  variants: {
    intent: {
      default: 'text-secondary-300',
      custom: 'text-primary-700',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});

interface SelectProps extends VariantProps<typeof listboxVariants> {
  label?: string;
  nolabel?: boolean;
  labelIcon?: ReactNode;
  leftIcon?: boolean;
  items: {
    icon: ReactNode;
    id: number;
    name: string;
  }[];
}

const Select: React.FC<SelectProps> = ({
  intent,
  fullWidth,
  disabled,
  leftIcon,
  ...props
}) => {
  const [selected, setSelected] = useState(props.items[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div hidden={!!props.nolabel}>
            <label className={labelVariants({ intent, fullWidth, disabled })}>
              {props.label}
            </label>
          </div>

          <div className=''>
            <Listbox.Button
              className={buttonVariants({ intent, fullWidth, disabled })}
            >
              {selected.name}

              <span className=''>
                {leftIcon && selected.icon && (
                  <span className={iconVariants({ intent })}>
                    {selected.icon}
                  </span>
                )}
              </span>
            </Listbox.Button>

            <Listbox.Options
              className={optionsVariants({
                intent,
                fullWidth,
                disabled,
              })}
            >
              {props.items.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) => optionVariants({ intent, active })}
                  value={item}
                >
                  <div className='flex items-center'>
                    <span className='ml-3 block truncate'>
                      {leftIcon && !!item.icon && (
                        <span className={iconVariants({ intent })}>
                          {item.icon}
                        </span>
                      )}
                      {item.name}
                    </span>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;

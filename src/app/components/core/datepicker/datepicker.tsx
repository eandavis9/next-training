import React, { useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import Datepicker from 'tailwind-datepicker-react';

const datePickerContainerVariants = cva('w-fit', {
  variants: {
    intent: {
      primary: 'text-secondary',
      secondary: 'text-danger',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    intent: 'primary',
    fullWidth: false,
  },
});

const datePickerVariants = cva('', {
  variants: {
    intent: {
      primary: 'border border-secondary-200',
      secondary: 'border border-secondary-200',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    intent: 'primary',
    fullWidth: false,
  },
});

interface DatePickerProps
  extends VariantProps<typeof datePickerContainerVariants> {
  label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  intent,
  fullWidth,
  ...props
}) => {
  const options: any = {
    title: props.label,
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: 'Clear',
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
      background: 'bg-warning-200',
      todayBtn: '',
      clearBtn: 'text-danger',
      icons: 'bg-primary',
      text: 'bg-danger-200',
      disabledText: 'bg-red-200',
      input: 'text-primary',
      inputIcon: 'text-primary',
      selected: 'text-danger',
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: 'top-12',
    defaultDate: new Date('2022-01-01'),
    language: 'en',
    disabledDates: [],
    weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    inputNameProp: 'date',
    inputIdProp: 'date',
    inputPlaceholderProp: 'Select Date',
    inputDateFormatProp: {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  };

  const [show, setShow] = useState<boolean>(false);

  const handleChange = (selectedDate: Date) => {
    console.log(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <div className={datePickerContainerVariants({ intent, fullWidth })}>
        <Datepicker
          classNames={datePickerVariants({ intent, fullWidth })}
          show={show}
          options={options}
          onChange={handleChange}
          setShow={handleClose}
        />
      </div>
    </div>
  );
};

export default DatePicker;

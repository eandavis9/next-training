import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { VariantProps, cva } from 'class-variance-authority';
import Button from '../button/button';

const alertVariants = cva('', {
  variants: {
    intent: {
      alert: '!bg-[transparent] !border-none !text-[#000000]',
      inline: 'py-3 flex justify-center w-full',
    },
    type: {
      default:
        'border rounded-md bg-primary-50 border-primary-600 text-primary',
      success:
        'border rounded-md bg-success-50 border-success-600 text-success',
      warning:
        'border rounded-md bg-warning-50 border-warning-600 text-warning-800',
      error: 'border rounded-md bg-danger-50 border-danger-600 text-danger',
    },
  },
  defaultVariants: {
    intent: 'alert',
    type: 'default',
  },
});

const alertIconVariants = cva('', {
  variants: {
    intent: {
      alert: 'flex justify-center mb-5 h-24',
      inline: 'flex mx-2 mr-2 w-6 h-6',
    },
    type: {
      default: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-danger',
    },
  },
  defaultVariants: {
    intent: 'alert',
    type: 'default',
  },
});

const alertMessageVariants = cva('text-secondary font-bold', {
  variants: {
    intent: {
      alert: 'flex justify-center',
      inline: 'mr-2',
    },
    type: {
      default: '',
      success: '',
      warning: '',
      error: '',
    },
  },
  defaultVariants: {
    intent: 'alert',
    type: 'default',
  },
});

interface AlertProps extends VariantProps<typeof alertVariants> {
  showalert: boolean;
  children: string;
  onClick?: () => void;
}

const Alert: React.FC<AlertProps> = ({ intent, type, onClick, ...props }) => {
  return (
    <>
      <div
        hidden={!props.showalert}
        className={alertVariants({ intent, type })}
      >
        <div className={alertIconVariants({ intent, type })}>
          {(type === 'default' && <InformationCircleIcon />) ||
            (type === 'warning' && <ExclamationCircleIcon />) ||
            (type === 'success' && <CheckCircleIcon />) ||
            (type === 'error' && <XCircleIcon />)}
        </div>

        <div className={alertMessageVariants({ intent, type })}>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Alert;

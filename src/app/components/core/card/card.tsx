import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import Button from '../button/button';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

const cardVariants = cva('shadow dark:bg-gray-800 dark:border-gray-700', {
  variants: {
    intent: {
      vertical: 'overflow-hidden rounded-lg bg-secondary-white shadow-md',
      horizontal:
        'flex h-fit w-full flex-col overflow-hidden rounded-lg bg-secondary-white shadow-md sm:flex-row',
    },
  },
  defaultVariants: {
    intent: 'vertical',
  },
});

const cardImageAnchorVariants = cva('', {
  variants: {
    intent: {
      vertical: '',
      horizontal: 'md:w-7/12',
    },
  },
  defaultVariants: {
    intent: 'vertical',
  },
});

const cardImageVariants = cva('', {
  variants: {
    intent: {
      vertical: 'w-full rounded-t-lg',
      horizontal: 'h-full object-cover object-center',
    },
  },
  defaultVariants: {
    intent: 'vertical',
  },
});

const cardContentVariants = cva('px-8 py-7', {
  variants: {
    intent: {
      vertical: '',
      horizontal: 'md:w-10/12',
    },
  },
  defaultVariants: {
    intent: 'vertical',
  },
});

interface CardProps extends VariantProps<typeof cardVariants> {
  heading: string;
  body: string;
}

const Card: React.FC<CardProps> = ({ intent, ...props }) => {
  return (
    <div className={cardVariants({ intent })}>
      <a href='#' className={cardImageAnchorVariants({ intent })}>
        <img
          className={cardImageVariants({ intent })}
          src='https://images.pexels.com/photos/207305/pexels-photo-207305.jpeg?auto=compress&cs=tinysrgb&w=800'
          alt=''
        />
      </a>
      <div className={cardContentVariants({ intent })}>
        <a href='#'>
          <div className='mb-2 text-base font-bold tracking-tight text-secondary'>
            {props.heading}
          </div>
        </a>
        <p className='mb-3  line-clamp-2 font-normal text-secondary-700 dark:text-secondary-500'>
          {props.body}
        </p>
        <Button intent='primary' label='Cool Button' leftIcon size='md'>
          <Squares2X2Icon></Squares2X2Icon>
        </Button>
      </div>
    </div>
  );
};

export default Card;

import React from 'react';
import Image from 'next/image';
import { VariantProps, cva } from 'class-variance-authority';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline';

const avatarVariants = cva('', {
  variants: {
    intent: {
      image: '',
      text: '',
      icon: '',
    },
  },
  defaultVariants: {
    intent: 'text',
  },
});

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  noLabel?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ intent, ...props }) => {
  return (
    <div className='inline-flex items-center gap-2'>
      <div className='flex h-10 w-10 items-center justify-center'>
        {intent === 'image' && (
          <Image
            className='h-10 w-10 rounded-full'
            src='https://via.placeholder.com/40x40'
            alt='Avatar'
            width={40}
            height={40}
            priority
          />
        )}
        {intent === 'text' && (
          <div className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary-white'>
            DT
          </div>
        )}
        {intent === 'icon' && (
          <div className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary-white'>
            <UserIcon className='h-5 w-5 origin-center' />
          </div>
        )}
      </div>
      {!props.noLabel && (
        <div className='flex items-center gap-2'>
          <p className='whitespace-nowrap text-base text-secondary'>
            Dominik Tyka
          </p>
          <div className='h-4 w-4 origin-center'>
            <ChevronDownIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;

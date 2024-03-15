import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import SearchBar from '../../search-bar/search-bar';
import Avatar from '../../avatar/avatar';
import IconButton from '../../icon-button/icon-button';
import { BellIcon } from '@heroicons/react/24/outline';

const topNavVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

interface TopNavProps extends VariantProps<typeof topNavVariants> {
  page: string;
}

const TopNav: React.FC<TopNavProps> = ({ ...props }) => {
  return (
    <nav className='duration-999 sticky top-0 flex h-20 items-center border-l border-secondary-50 bg-secondary-white px-10 transition ease-in-out'>
      {/* // TODO: Convert as breadcrumbs component
       */}
      <div className='flex h-5 shrink grow basis-0 items-center justify-start text-base font-bold text-secondary'>
        {props.page}
      </div>

      <div className='flex h-10 items-center justify-end gap-3'>
      <div className='flex items-center justify-center h-10 w-10 rounded-full border border-secondary-50 bg-gray-200'>
        <IconButton dot>
          <BellIcon className='h-6 w-6 text-gray-500' style={{ fill: 'grey' }} />
        </IconButton>
      </div>
        <div className='h-10 border-l border-secondary-50'></div>
        <Avatar intent={'image'}></Avatar>
      </div>
    </nav>
  );
};

export default TopNav;

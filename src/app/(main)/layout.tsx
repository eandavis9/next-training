"use client";


import SideNav from '@/app/components/core/nav/side-nav/side-nav';
import TopNav from '@/app/components/core/nav/top-nav/top-nav';
import {
    BellIcon,
    Cog6ToothIcon,
    PencilSquareIcon,
    Squares2X2Icon,
    UserIcon,
    PlusIcon,
    CalendarDaysIcon,
    UsersIcon
  } from '@heroicons/react/24/outline';

  export default function MainLayout({ children }: { children: React.ReactNode }) {
   
    const sideNavItems = [
        {
            label: 'DASHBOARD',
            route: '/',
            children: <Squares2X2Icon />,
        },
        {
            label: 'PATIENTS',
            route: '/patients',
            children: <UserIcon />,
        },
        {
            label: 'CALENDAR',
            route: '/calendar',
            children: <CalendarDaysIcon />,
        },
        {
            label: 'DENTISTS',
            route: '/dentists',
            children: <UserIcon />,
        },
        {
            label: 'STAFF',
            route: '/staff',
            children: <UsersIcon />,
        },
        {
            label: 'SETTINGS',
            route: '/settings',
            children: <Cog6ToothIcon />,
        },
    ];
    
    return (
        <div className='min-height-screen relative flex'>
            <SideNav
                items={sideNavItems.map(item => ({
                    ...item,
                }))}
                logoPath={'/images/logo.png'}
            />
            <div className='flex-1'>
                <TopNav page={''} />
                <main className='flex h-[calc(100vh-70px)] w-screen flex-col gap-11 overflow-y-auto bg-secondary-50 p-6 sm:w-full'>{children}</main>
            </div>
        </div>
    );
}
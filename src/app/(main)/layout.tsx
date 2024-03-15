"use client";

import { useEffect } from "react";
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
    return (
        <div className='min-height-screen relative flex'>
            <SideNav
                items={[
                {
                    label: 'DASHBOARD',
                    children: <Squares2X2Icon></Squares2X2Icon>,
                },
                {
                    label: 'PATIENTS',
                    children: <UserIcon></UserIcon>,
                    selected: true,
                },
                {
                    label: 'CALENDAR',
                    children: <CalendarDaysIcon></CalendarDaysIcon>,
                },
                {
                    label: 'DENTISTS',
                    children: <UserIcon></UserIcon>,
                },
                {
                    label: 'STAFF',
                    children: <UsersIcon></UsersIcon>,
                },
                {
                    label: 'SETTINGS',
                    children: <Cog6ToothIcon></Cog6ToothIcon>,
                },
                ]}
                logoPath={'/images/logo.png'}
            />
            <div className='flex-1'>
                <TopNav page={''} />
                <main className='flex h-[calc(100vh-70px)] w-screen flex-col gap-11 overflow-y-auto bg-secondary-50 p-6 sm:w-full'>{children}</main>
            </div>
        </div>
    );
}
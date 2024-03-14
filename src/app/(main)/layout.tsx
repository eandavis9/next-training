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
    PlusIcon
  } from '@heroicons/react/24/outline';

  export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-height-screen relative flex'>
            <SideNav
                items={[
                {
                    label: 'Dashboard',
                    children: <Squares2X2Icon></Squares2X2Icon>,
                },
                {
                    label: 'Patients',
                    children: <UserIcon></UserIcon>,
                    selected: true,
                },
                {
                    label: 'Calendar',
                    children: <Cog6ToothIcon></Cog6ToothIcon>,
                },
                {
                    label: 'Dentists',
                    children: <UserIcon></UserIcon>,
                },
                {
                    label: 'Staff',
                    children: <UserIcon></UserIcon>,
                },
                {
                    label: 'Settings',
                    children: <Cog6ToothIcon></Cog6ToothIcon>,
                },
                ]}
                logoPath={'images/img-logo-colored.svg'}
            />
            <div className='flex-1'>
                <TopNav page={''} />
                <main className='flex h-[calc(100vh-70px)] w-screen flex-col gap-11 overflow-y-auto bg-secondary-50 p-6 sm:w-full'>{children}</main>
            </div>
        </div>
    );
}
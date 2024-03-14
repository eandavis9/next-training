import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'tailwindcss/tailwind.css';
import './globals.css';

import '/node_modules/animate.css/animate.css';
import '@/app/style.css'


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Underscore',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-theme=''>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

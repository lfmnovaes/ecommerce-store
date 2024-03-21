import type {Metadata} from 'next';
import {ClerkProvider} from '@clerk/nextjs';
import {Inter} from 'next/font/google';

import {ModalProvider} from '@/providers/modal-provider';

import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Apexhub Admin Dashboard',
  description: 'Admin Dashboard for Apexhub'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

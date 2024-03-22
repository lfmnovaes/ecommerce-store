import type {Metadata} from 'next';
import {ClerkProvider} from '@clerk/nextjs';
import {Inter} from 'next/font/google';

import {ModalProvider} from '@/providers/modal-provider';
import {ToasterProvider} from '@/providers/toast-provider';

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
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

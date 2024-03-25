import type {Metadata} from 'next';
import {ClerkProvider} from '@clerk/nextjs';
import {Inter} from 'next/font/google';

import {ModalProvider} from '@/providers/modal-provider';
import {Toaster} from '@/providers/toaster';

import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Ecommerce store',
  description: 'Admin dashboard for the ecommerce store'
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
          {children}
          <ModalProvider />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

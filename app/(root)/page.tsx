'use client';

import {useEffect} from 'react';
import {UserButton} from '@clerk/nextjs';

import {Button} from '@/components/ui/button';
import {useStoreModal} from '@/hooks/use-store-modal';

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <main className="p-4 h-full w-full dark text-white bg-black">
      <div className="flex gap-8">
        <span>Hello Admin Dashboard</span>
        <Button>Click me</Button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </main>
  );
}

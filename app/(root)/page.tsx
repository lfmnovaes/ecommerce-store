import {UserButton} from '@clerk/nextjs';
import {Button} from '@/components/ui/button';

export default function Home() {
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

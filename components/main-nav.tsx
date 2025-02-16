'use client';

import {useParams, usePathname} from 'next/navigation';

import {cn} from '@/lib/utils';
import Link from 'next/link';

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Overview',
      isActive: pathname === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      isActive: pathname === `/${params.storeId}/billboards`
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      isActive: pathname === `/${params.storeId}/settings`
    }
  ];

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.isActive
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

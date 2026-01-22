'use client';

import { Home, LayoutGrid, List, User, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';

const customerNavItems = [
  { href: '/customer/dashboard', icon: Home, label: 'Inicio' },
  { href: '/customer/services', icon: LayoutGrid, label: 'Servicios' },
  { href: '/customer/activity', icon: List, label: 'Actividad' },
  { href: '/customer/account', icon: User, label: 'Cuenta' },
];

const workerNavItems = [
    { href: '/worker/dashboard', icon: Home, label: 'Inicio' },
    { href: '/worker/activity', icon: List, label: 'Actividad' },
    { href: '/worker/earnings', icon: BarChart2, label: 'Ganancias' },
    { href: '/worker/account', icon: User, label: 'Perfil' },
];

export function BottomNav() {
  const pathname = usePathname();
  const isWorker = pathname.startsWith('/worker');
  
  const navItems = useMemo(() => isWorker ? workerNavItems : customerNavItems, [isWorker]);

  return (
    <nav className="border-t border-border bg-card/95 backdrop-blur-sm">
      <div className="grid h-16 grid-cols-4 items-center">
        {navItems.map((item) => {
          const isActive = (item.href.endsWith('/dashboard'))
            ? pathname.includes('/dashboard')
            : pathname.startsWith(item.href);

          return (
            <Link href={item.href} key={item.label}>
              <div
                className={cn(
                  'flex h-full flex-col items-center justify-center gap-1 text-muted-foreground transition-colors',
                  isActive && 'text-primary'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

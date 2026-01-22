'use client';

import { LogOut, Truck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const customerNavItems = [
  { href: '/customer/dashboard', label: 'Inicio' },
  { href: '/customer/services', label: 'Servicios' },
  { href: '/customer/activity', label: 'Actividad' },
  { href: '/customer/account', label: 'Cuenta' },
];

const workerNavItems = [
  { href: '/worker/dashboard', label: 'Inicio' },
  { href: '/worker/activity', label: 'Actividad' },
  { href: '/worker/earnings', label: 'Ganancias' },
  { href: '/worker/account', label: 'Perfil' },
];


export function Header() {
  const pathname = usePathname();
  const isWorker = pathname.startsWith('/worker');

  const navItems = useMemo(() => isWorker ? workerNavItems : customerNavItems, [isWorker]);
  const homeHref = isWorker ? '/worker/dashboard' : '/customer/dashboard';

  return (
    <header className="hidden md:block bg-accent shadow-sm">
      <div className="mx-auto max-w-screen-lg flex items-center justify-between p-4">
        <Link href={homeHref} className="flex items-center gap-2 font-bold text-lg text-accent-foreground">
          <Truck className="h-7 w-7" />
          <span>Transpo</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
              const isActive = (item.href.endsWith('/dashboard'))
                  ? pathname.includes('/dashboard')
                  : pathname.startsWith(item.href);

              return (
                  <Link href={item.href} key={item.label}>
                      <span
                      className={cn(
                          'text-accent-foreground/80 transition-colors hover:text-accent-foreground',
                          isActive && 'text-accent-foreground font-semibold'
                      )}
                      >
                      {item.label}
                      </span>
                  </Link>
              );
          })}
        </nav>
        <Button asChild variant="ghost" size="sm" className="text-accent-foreground/80 hover:text-accent-foreground hover:bg-black/10">
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Link>
        </Button>
      </div>
    </header>
  );
}

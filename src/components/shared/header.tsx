'use client';

import { LogOut, Truck, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const customerNavItems = [
  { href: '/customer/dashboard', label: 'Inicio' },
  { href: '/services', label: 'Servicios' },
  { href: '/activity', label: 'Actividad' },
  { href: '/account', label: 'Cuenta' },
];

const workerNavItems = [
  { href: '/worker/dashboard', label: 'Inicio' },
  { href: '/activity', label: 'Actividad' },
  { href: '/worker/earnings', label: 'Ganancias' },
  { href: '/account', label: 'Perfil' },
];


export function Header() {
  const pathname = usePathname();
  const isWorker = pathname.includes('/worker');

  const navItems = useMemo(() => isWorker ? workerNavItems : customerNavItems, [isWorker]);
  const homeHref = isWorker ? '/worker/dashboard' : '/customer/dashboard';

  return (
    <header className="hidden md:flex items-center justify-between p-4 border-b bg-card/95 backdrop-blur-sm">
      <Link href={homeHref} className="flex items-center gap-2 font-bold text-lg">
        <Truck className="h-7 w-7 text-primary" />
        <span>Transpo</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        {navItems.map((item) => {
            const isActive = (item.href === '/customer/dashboard' || item.href === '/worker/dashboard')
                ? pathname.includes('/dashboard')
                : pathname.startsWith(item.href);

            return (
                <Link href={item.href} key={item.label}>
                    <span
                    className={cn(
                        'text-muted-foreground transition-colors hover:text-primary',
                        isActive && 'text-primary'
                    )}
                    >
                    {item.label}
                    </span>
                </Link>
            );
        })}
      </nav>
      <Button asChild variant="ghost" size="sm">
        <Link href="/">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Link>
      </Button>
    </header>
  );
}

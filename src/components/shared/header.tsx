'use client';

import { LogOut, Truck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/customer/dashboard', label: 'Inicio' },
  { href: '/services', label: 'Servicios' },
  { href: '/activity', label: 'Actividad' },
  { href: '/account', label: 'Cuenta' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="hidden md:flex items-center justify-between p-4 border-b bg-card/95 backdrop-blur-sm">
      <Link href="/customer/dashboard" className="flex items-center gap-2 font-bold text-lg">
        <Truck className="h-7 w-7 text-primary" />
        <span>Transpo</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        {navItems.map((item) => {
            const isActive = item.href === '/customer/dashboard'
                ? pathname.includes('/dashboard')
                : pathname === item.href;

            const finalHref = pathname.includes('/worker') && item.href === '/customer/dashboard' ? '/worker/dashboard' : item.href;

            return (
                <Link href={finalHref} key={item.label}>
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

'use client';

import { Home, LayoutGrid, List, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const navItems = [
  { href: '/customer/dashboard', icon: Home, label: 'Inicio' },
  { href: '/services', icon: LayoutGrid, label: 'Servicios' },
  { href: '/activity', icon: List, label: 'Actividad' },
  { href: '/account', icon: User, label: 'Cuenta' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-border bg-card/95 backdrop-blur-sm">
      <div className="grid h-16 grid-cols-4 items-center">
        {navItems.map((item) => {
          // A bit of logic to handle both worker and customer dashboards on 'Inicio'
          const isActive = item.href === '/customer/dashboard'
            ? pathname.includes('/dashboard')
            : pathname === item.href;
            
          const finalHref = pathname.includes('/worker') && item.href === '/customer/dashboard' ? '/worker/dashboard' : item.href;

          return (
            <Link href={finalHref} key={item.label}>
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

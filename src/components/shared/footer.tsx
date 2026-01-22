import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export function Footer() {
  return (
    <footer className="hidden md:block bg-secondary w-full">
      <div className="mx-auto max-w-screen-lg p-4 flex justify-between items-center text-sm text-secondary-foreground">
        <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            <span>&copy; {new Date().getFullYear()} Tu Chamba Libre</span>
        </div>
        <div className="flex gap-4">
            <Link href="#" className="hover:underline">Términos y Condiciones</Link>
            <Link href="#" className="hover:underline">Política de Privacidad</Link>
        </div>
      </div>
    </footer>
  );
}

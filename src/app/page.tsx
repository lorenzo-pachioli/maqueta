import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RoleSelectionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Ingresar como</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button asChild size="lg" className="h-16 text-lg">
            <Link href="/onboarding/customer">Cliente</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="h-16 text-lg">
            <Link href="/onboarding/worker">Trabajador</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

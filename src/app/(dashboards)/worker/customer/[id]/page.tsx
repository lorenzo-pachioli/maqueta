'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatMock } from '@/components/shared/chat-mock';
import { mockCustomers } from '@/lib/mock-data';
import { Mail, Phone } from 'lucide-react';

export default function CustomerProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const customerId = params.id as string;

  const service = searchParams.get('service');
  const date = searchParams.get('date');

  const customer = useMemo(() => {
    return mockCustomers.find((c) => c.id === customerId);
  }, [customerId]);

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p>Cliente no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-screen-lg mx-auto">
      {service && date && (
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{service}</h1>
          <p className="mt-1 text-muted-foreground">
            Servicio agendado para el{' '}
            {new Date(date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>
      )}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Customer Info Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={customer.avatarUrl} alt={customer.name} data-ai-hint={customer.imageHint} />
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{customer.name}</CardTitle>
                  <CardDescription>Cliente</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{customer.name.split(' ')[0].toLowerCase().replace('.', '')}@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>+54 9 11 9876-5432</span>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Column */}
        <div className="h-[calc(100vh-280px)]">
          <ChatMock contactName={customer.name} />
        </div>
      </div>
    </div>
  );
}

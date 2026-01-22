'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockWorkerActivities } from '@/lib/mock-data';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChatMock } from '@/components/shared/chat-mock';
import { MessageSquare, ArrowRight } from 'lucide-react';

type Activity = (typeof mockWorkerActivities)[0];

export default function WorkerActivityPage() {
  const [selectedChatCustomer, setSelectedChatCustomer] = useState<Activity['customer'] | null>(null);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Mi Actividad</h1>
        <p className="mt-1 text-muted-foreground">Aquí se muestra un historial de los servicios que realizaste.</p>
      </header>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {mockWorkerActivities.map((activity) => (
          <AccordionItem value={activity.id} key={activity.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <AccordionTrigger className="w-full p-6 hover:no-underline">
                <div className="flex justify-between items-center w-full">
                    <div className='text-left'>
                        <p className="text-lg font-semibold">{activity.serviceType}</p>
                    </div>
                    <Badge 
                        variant={
                            activity.status === 'Completado' || activity.status === 'Pagado' ? 'default' 
                            : activity.status === 'Cancelado' ? 'destructive'
                            : 'secondary'
                        }
                        className={activity.status === 'Completado' || activity.status === 'Pagado' ? 'bg-green-500' : ''}
                    >
                        {activity.status}
                    </Badge>
                </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-muted-foreground">Cliente</p>
                        <p className="font-semibold">{activity.customer.name}</p>
                    </div>
                    <div className='text-right'>
                        <p className="text-sm text-muted-foreground">Fecha</p>
                         <p className="font-semibold">
                            {new Date(activity.date).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setSelectedChatCustomer(activity.customer)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contactar
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href={`/worker/customer/${activity.customer.id}?service=${encodeURIComponent(activity.serviceType)}&date=${activity.date}`}>
                        Ir
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className='text-right'>
                      <p className="text-sm text-muted-foreground">Ganancia</p>
                      <p className="font-bold text-lg">${activity.cost.toFixed(2)}</p>
                  </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Dialog open={!!selectedChatCustomer} onOpenChange={() => setSelectedChatCustomer(null)}>
        <DialogContent className="max-w-lg p-0">
          {selectedChatCustomer && <ChatMock contactName={selectedChatCustomer.name} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

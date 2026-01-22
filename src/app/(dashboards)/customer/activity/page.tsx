'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockWorkers } from '@/lib/mock-data';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChatMock } from '@/components/shared/chat-mock';
import { MessageSquare } from 'lucide-react';

const mockActivities = [
  {
    id: 'act1',
    worker: mockWorkers[0],
    date: '2024-07-15',
    cost: 45.0,
    status: 'Completado',
  },
  {
    id: 'act2',
    worker: mockWorkers[2],
    date: '2024-07-12',
    cost: 75.0,
    status: 'Completado',
  },
  {
    id: 'act3',
    worker: mockWorkers[1],
    date: '2024-07-10',
    cost: 24.0,
    status: 'Cancelado',
  },
    {
    id: 'act4',
    worker: mockWorkers[3],
    date: '2024-07-08',
    cost: 28.0,
    status: 'Completado',
  },
];

type Activity = (typeof mockActivities)[0];

export default function ActivityPage() {
  const [selectedChatWorker, setSelectedChatWorker] = useState<Activity['worker'] | null>(null);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Actividad Reciente</h1>
        <p className="mt-1 text-muted-foreground">Aquí se muestra un historial de los servicios contratados.</p>
      </header>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {mockActivities.map((activity) => (
          <AccordionItem value={activity.id} key={activity.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <AccordionTrigger className="w-full p-6 hover:no-underline">
                <div className="flex justify-between items-center w-full">
                    <div className='text-left'>
                        <p className="text-lg font-semibold">{activity.worker.serviceType}</p>
                    </div>
                    <Badge variant={activity.status === 'Completado' ? 'default' : 'destructive'} className={activity.status === 'Completado' ? 'bg-green-500' : ''}>
                        {activity.status}
                    </Badge>
                </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-muted-foreground">Trabajador</p>
                        <p className="font-semibold">{activity.worker.name}</p>
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
                  <Button variant="outline" onClick={() => setSelectedChatWorker(activity.worker)}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contactar
                  </Button>
                  <div className='text-right'>
                      <p className="text-sm text-muted-foreground">Costo Total</p>
                      <p className="font-bold text-lg">${activity.cost.toFixed(2)}</p>
                  </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Dialog open={!!selectedChatWorker} onOpenChange={() => setSelectedChatWorker(null)}>
        <DialogContent className="max-w-lg p-0">
          {selectedChatWorker && <ChatMock contactName={selectedChatWorker.name} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

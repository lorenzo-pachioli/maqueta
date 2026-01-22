'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, Calendar, X } from 'lucide-react';
import { mockWorkers, Worker } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChatMock } from '@/components/shared/chat-mock';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// --- Availability Viewer Component ---
const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const hours = Array.from({ length: 17 }, (_, i) => i + 7); // 7am to 11pm (23:00)

type AvailabilityViewerProps = {
  availableSlots: string[];
};

function AvailabilityViewer({ availableSlots }: AvailabilityViewerProps) {
  return (
    <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-1 text-xs">
      <div />
      {days.map((day) => (
        <div key={day} className="text-center font-semibold p-2">
          {day.substring(0, 3)}
        </div>
      ))}

      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <div className="text-right font-semibold p-2">{`${hour
            .toString()
            .padStart(2, '0')}:00`}</div>
          {days.map((day, dayIndex) => {
            const slotId = `${dayIndex}-${hour}`;
            const isAvailable = availableSlots.includes(slotId);
            return (
              <div
                key={slotId}
                className={cn(
                  'h-8 rounded-sm border flex items-center justify-center',
                  isAvailable
                    ? 'bg-primary/80'
                    : 'bg-muted/40'
                )}
                aria-label={`${day} a las ${hour}:00 ${isAvailable ? 'disponible' : 'no disponible'}`}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
// --- End Availability Viewer Component ---


export default function WorkerProfilePage() {
  const params = useParams();
  const workerId = params.id as string;
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);

  const worker = useMemo(() => {
    return mockWorkers.find((w) => w.id === workerId);
  }, [workerId]);

  if (!worker) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p>Trabajador no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8 max-w-screen-lg mx-auto">
      {/* Worker Info Column */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={worker.avatarUrl} alt={worker.name} data-ai-hint={worker.imageHint} />
                <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{worker.name}</CardTitle>
                <CardDescription>{worker.serviceType}</CardDescription>
                 <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{worker.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>A {worker.distance} km</span>
                    </div>
                  </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-3xl font-bold">${worker.pricePerHour}<span className='text-sm font-normal text-muted-foreground'>/hora</span></p>
            </div>
            <Separator className="my-4" />
             <Button className="w-full" variant="outline" onClick={() => setIsAvailabilityOpen(true)}>
                <Calendar className="mr-2 h-4 w-4" />
                Ver horarios disponibles
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat Column */}
      <div className="h-[calc(100vh-180px)]">
         <ChatMock contactName={worker.name} />
      </div>

      {/* Availability Dialog */}
      <Dialog open={isAvailabilityOpen} onOpenChange={setIsAvailabilityOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Disponibilidad de {worker.name}</DialogTitle>
            <DialogDescription>
              Estos son los horarios en los que {worker.name} suele estar disponible.
            </DialogDescription>
          </DialogHeader>
          <AvailabilityViewer availableSlots={worker.availability} />
           <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

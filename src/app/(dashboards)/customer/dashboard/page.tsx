'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { MapPin, X } from 'lucide-react';
import { Filters } from '@/components/customer/filters';
import { WorkerCard } from '@/components/customer/worker-card';
import { mockWorkers, Worker } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const mapInfo = PlaceHolderImages.find((img) => img.id === 'map-background');

export default function CustomerDashboardPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const filteredWorkers = useMemo(() => {
    if (selectedServices.length === 0) {
      return mockWorkers;
    }
    return mockWorkers.filter((worker) => selectedServices.includes(worker.serviceType));
  }, [selectedServices]);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-81px)]">
      <div className="w-full md:w-1/3 p-4 space-y-6 overflow-y-auto">
        <header>
          <h1 className="text-3xl font-bold">Servicios</h1>
          <p className="text-muted-foreground">Selecciona un servicio para ver los trabajadores disponibles.</p>
        </header>
        <section>
          <Filters selectedServices={selectedServices} onServiceSelect={handleServiceToggle} />
        </section>
      </div>

      <div className="w-full md:w-2/3 h-64 md:h-full relative">
        {mapInfo && (
          <Image
            src={mapInfo.imageUrl}
            alt={mapInfo.description}
            fill
            className="object-cover"
            data-ai-hint={mapInfo.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/10">
          {filteredWorkers.map((worker) => (
            <Button
              key={worker.id}
              variant="ghost"
              size="icon"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground backdrop-blur-sm w-10 h-10"
              style={{ top: `${worker.lat}%`, left: `${worker.lng}%` }}
              onClick={() => setSelectedWorker(worker)}
            >
              <MapPin className="h-5 w-5" />
            </Button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedWorker} onOpenChange={() => setSelectedWorker(null)}>
        <DialogContent>
          {selectedWorker && <WorkerCard worker={selectedWorker} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

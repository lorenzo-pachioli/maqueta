'use client';

import { useState, useMemo } from 'react';
import { serviceCategories, mockWorkers } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { WorkerCard } from '@/components/customer/worker-card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const filteredWorkers = useMemo(() => {
    if (!selectedService) {
      return [];
    }
    return mockWorkers.filter((worker) => worker.serviceType === selectedService);
  }, [selectedService]);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService((prev) => (prev === serviceName ? null : serviceName));
  };

  return (
    <div className="grid md:grid-cols-[1fr_400px] h-[calc(100vh-81px)]">
      {/* Left Column: Services */}
      <ScrollArea className="h-full">
        <div className="p-4 md:p-8 space-y-8">
          <header>
            <h1 className="text-3xl font-bold">Servicios</h1>
            <p className="text-muted-foreground">Explora todos los servicios que ofrecemos.</p>
          </header>

          {serviceCategories.map((category) => (
            <section key={category.name}>
              <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.services.map((service) => (
                  <Card
                    key={service.name}
                    onClick={() => handleServiceClick(service.name)}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md',
                      selectedService === service.name
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'ring-0'
                    )}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                      <service.icon className="h-10 w-10 text-primary mx-auto" />
                      <p className="font-semibold">{service.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </ScrollArea>

      {/* Right Column: Workers */}
      <div className="hidden md:block border-l bg-muted/20">
        <ScrollArea className="h-full">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedService ? `Trabajadores para "${selectedService}"` : 'Selecciona un servicio'}
            </h2>
            
            {selectedService ? (
              filteredWorkers.length > 0 ? (
                <div className="space-y-4">
                  {filteredWorkers.map((worker) => (
                    <WorkerCard worker={worker} key={worker.id} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-[calc(100vh-200px)] text-center">
                    <p className="text-muted-foreground">No se encontraron trabajadores para este servicio.</p>
                </div>
              )
            ) : (
                <div className="flex items-center justify-center h-[calc(100vh-200px)] text-center">
                    <p className="text-muted-foreground">Selecciona un servicio para ver los trabajadores.</p>
                </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

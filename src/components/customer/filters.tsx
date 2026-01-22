'use client';

import { Filter, X } from 'lucide-react';
import React from 'react';

import { serviceTypes } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function Filters() {
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const clearService = (service: string) => {
    setSelectedServices((prev) => prev.filter((s) => s !== service));
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-lg">
            <SheetHeader className="mb-4">
              <SheetTitle>Filtrar Servicios</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4">
              {serviceTypes.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <Label htmlFor={service} className="text-base">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
            <Button onClick={() => setIsOpen(false)} className="w-full mt-6">Aplicar</Button>
          </SheetContent>
        </Sheet>
        <div className="w-48">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Mejor rating</SelectItem>
              <SelectItem value="distance">Mayor cercanía</SelectItem>
              <SelectItem value="price">Menor precio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedServices.map(service => (
           <Badge key={service} variant="secondary" className="pl-3 pr-1 py-1 text-sm">
             {service}
             <button onClick={() => clearService(service)} className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20">
              <X className="h-3 w-3" />
             </button>
           </Badge>
        ))}
      </div>
    </div>
  );
}

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { serviceCategories } from '@/lib/mock-data';
import React from 'react';

type ServiceSelectorProps = {
  selectedServices: string[];
  onServiceSelect: (service: string) => void;
};

export function Filters({ selectedServices, onServiceSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-4">
      {serviceCategories.map((category) => {
        if (category.name === 'A donde vayas') {
          return (
            <div key={category.name}>
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <div className="grid grid-cols-2 gap-3">
                {category.services.map((service) => (
                  <Card
                    key={service.name}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md',
                      selectedServices.includes(service.name)
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'ring-0'
                    )}
                    onClick={() => onServiceSelect(service.name)}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                      <service.icon className="h-8 w-8 text-primary" />
                      <span className="text-sm font-semibold text-center">
                        {service.name}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div key={category.name}>
            <h2 className="text-xl font-bold mb-2">{category.name}</h2>
            <div className="grid grid-cols-2 gap-3">
              {category.services.map((service) => (
                <Card
                  key={service.name}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    selectedServices.includes(service.name)
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : 'ring-0'
                  )}
                  onClick={() => onServiceSelect(service.name)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                    <service.icon className="h-8 w-8 text-primary" />
                    <span className="text-sm font-semibold text-center">
                      {service.name}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

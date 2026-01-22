import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';

import type { Worker } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

type WorkerCardProps = {
  worker: Worker;
};

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4 p-4">
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src={worker.avatarUrl}
            alt={`Avatar de ${worker.name}`}
            width={64}
            height={64}
            data-ai-hint={worker.imageHint}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <CardHeader className="p-0">
            <h3 className="font-bold text-lg">{worker.name}</h3>
            <p className="text-sm text-muted-foreground">{worker.serviceType}</p>
          </CardHeader>
          <CardContent className="flex items-center gap-4 p-0 pt-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{worker.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{worker.distance} km</span>
            </div>
          </CardContent>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">${worker.pricePerHour}</p>
          <p className="text-xs text-muted-foreground">/ hora</p>
        </div>
      </div>
      <CardFooter className="bg-muted/50 p-2">
        <Button className="w-full" variant="ghost">
          Ver disponibilidad
        </Button>
      </CardFooter>
    </Card>
  );
}

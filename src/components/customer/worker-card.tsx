import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import Link from 'next/link';

import type { Worker } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';

type WorkerCardProps = {
  worker: Worker;
};

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md border-0 shadow-none">
        <CardHeader className="flex-row items-center gap-4 p-0 pb-4">
            <div className="relative h-20 w-20 shrink-0">
                <Image
                    src={worker.avatarUrl}
                    alt={`Avatar de ${worker.name}`}
                    width={80}
                    height={80}
                    data-ai-hint={worker.imageHint}
                    className="rounded-full object-cover"
                />
            </div>
            <div className="flex-grow">
                <CardTitle className="text-xl">{worker.name}</CardTitle>
                <CardDescription>{worker.serviceType}</CardDescription>
                <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{worker.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{worker.distance} km</span>
                    </div>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0 text-center">
            <div className='p-4 rounded-lg bg-muted/50'>
                <p className="text-3xl font-bold">${worker.pricePerHour}<span className='text-sm font-normal text-muted-foreground'>/hora</span></p>
            </div>
        </CardContent>
      <CardFooter className="p-0 pt-4">
        <Button asChild className="w-full" size="lg">
          <Link href={`/customer/worker/${worker.id}`}>
            Ver disponibilidad y contratar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

import { MapPin } from 'lucide-react';
import { Filters } from '@/components/customer/filters';
import { WorkerCard } from '@/components/customer/worker-card';
import { mockWorkers } from '@/lib/mock-data';

export default function CustomerDashboardPage() {
  return (
    <div className="p-4 space-y-6">
      <header className="pt-6">
        <h1 className="text-3xl font-bold">Hola, Cliente</h1>
        <div className="flex items-center gap-1 text-muted-foreground mt-1">
          <MapPin className="h-4 w-4" />
          <span>Buenos Aires, Argentina</span>
        </div>
      </header>

      <section>
        <Filters />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Trabajadores Disponibles</h2>
        <div className="grid gap-4">
          {mockWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </section>
    </div>
  );
}

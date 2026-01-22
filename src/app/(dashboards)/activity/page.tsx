import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockWorkers } from '@/lib/mock-data';

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

export default function ActivityPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Actividad Reciente</h1>
        <p className="mt-1 text-muted-foreground">Aquí se muestra un historial de los servicios contratados.</p>
      </header>
      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <Card key={activity.id}>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{activity.worker.serviceType}</span>
                <Badge variant={activity.status === 'Completado' ? 'default' : 'destructive'} className='bg-green-500'>
                  {activity.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Con <span className="font-semibold">{activity.worker.name}</span></p>
              <p className="text-sm text-muted-foreground">
                {new Date(activity.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </CardContent>
            <Separator />
            <CardFooter className="p-4 flex justify-end">
              <p className="font-bold text-lg">${activity.cost.toFixed(2)}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

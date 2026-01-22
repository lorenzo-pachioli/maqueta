import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const mockWorkerActivities = [
  {
    id: 'act1',
    customerName: 'Ana C.',
    serviceType: 'Transporte Personal',
    date: '2024-07-15',
    cost: 45.0,
    status: 'Completado',
  },
  {
    id: 'act2',
    customerName: 'Pedro M.',
    serviceType: 'Entrega de Paquetes',
    date: '2024-07-12',
    cost: 75.0,
    status: 'Completado',
  },
  {
    id: 'act3',
    customerName: 'Mariana P.',
    serviceType: 'Transporte Personal',
    date: '2024-07-10',
    cost: 24.0,
    status: 'Pagado',
  },
    {
    id: 'act4',
    customerName: 'Luis G.',
    serviceType: 'Mudanza Ligera',
    date: '2024-07-08',
    cost: 28.0,
    status: 'Completado',
  },
];

export default function WorkerActivityPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Mi Actividad</h1>
        <p className="mt-1 text-muted-foreground">Aquí se muestra un historial de los servicios que realizaste.</p>
      </header>
      <div className="space-y-4">
        {mockWorkerActivities.map((activity) => (
          <Card key={activity.id}>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>{activity.serviceType}</span>
                <Badge variant={activity.status === 'Completado' || activity.status === 'Pagado' ? 'default' : 'destructive'} className={activity.status === 'Completado' || activity.status === 'Pagado' ? 'bg-green-500' : ''}>
                  {activity.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Para <span className="font-semibold">{activity.customerName}</span></p>
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

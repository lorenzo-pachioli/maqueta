'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import React from 'react';

const currentServices = [
    { name: 'Transporte Personal', rate: 15.00 },
    { name: 'Entrega de Paquetes', rate: 12.00 },
];

export default function WorkerServicesPage() {
    const [services, setServices] = React.useState(currentServices);
    
    const handleRemoveService = (serviceName: string) => {
        setServices(services.filter(s => s.name !== serviceName));
    }

    return (
        <div className="p-4 md:p-8 space-y-6">
            <header>
                <h1 className="text-3xl font-bold">Mis Servicios</h1>
                <p className="mt-1 text-muted-foreground">Gestiona los servicios que ofreces.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Servicios Activos</CardTitle>
                    <CardDescription>
                        Aquí puedes ver y eliminar los servicios que ofreces actualmente.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {services.length > 0 ? (
                        services.map(service => (
                            <div key={service.name} className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                                <div>
                                    <p className="font-semibold">{service.name}</p>
                                    <p className="text-sm text-muted-foreground">Tarifa por hora: ${service.rate.toFixed(2)}</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleRemoveService(service.name)}>
                                    <Trash2 className="h-5 w-5 text-destructive" />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">No tienes servicios activos.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

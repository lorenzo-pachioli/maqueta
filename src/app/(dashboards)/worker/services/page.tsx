'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Pencil } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Service = {
    name: string;
    rate: number;
};

const currentServices: Service[] = [
    { name: 'Transporte Personal', rate: 15.00 },
    { name: 'Entrega de Paquetes', rate: 12.00 },
];

const editServiceSchema = z.object({
  rate: z.coerce.number().min(1, { message: 'La tarifa debe ser mayor a 0.' }),
});

export default function WorkerServicesPage() {
    const [services, setServices] = React.useState(currentServices);
    const [editingService, setEditingService] = React.useState<Service | null>(null);

    const form = useForm<z.infer<typeof editServiceSchema>>({
        resolver: zodResolver(editServiceSchema),
    });

    React.useEffect(() => {
        if (editingService) {
            form.reset({ rate: editingService.rate });
        }
    }, [editingService, form]);
    
    const handleRemoveService = (serviceName: string) => {
        setServices(services.filter(s => s.name !== serviceName));
    };

    const handleEditService = (data: z.infer<typeof editServiceSchema>) => {
        if (!editingService) return;
        setServices(
            services.map(s =>
                s.name === editingService.name ? { ...s, rate: data.rate } : s
            )
        );
        setEditingService(null);
    };

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
                        Aquí puedes ver, editar y eliminar los servicios que ofreces actualmente.
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
                                <div className="flex items-center">
                                    <Button variant="ghost" size="icon" onClick={() => setEditingService(service)}>
                                        <Pencil className="h-5 w-5 text-muted-foreground" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveService(service.name)}>
                                        <Trash2 className="h-5 w-5 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">No tienes servicios activos.</p>
                    )}
                </CardContent>
            </Card>

            <Dialog open={!!editingService} onOpenChange={(isOpen) => !isOpen && setEditingService(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Servicio: {editingService?.name}</DialogTitle>
                        <DialogDescription>
                            Ajusta la tarifa por hora para este servicio.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleEditService)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="rate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tarifa por hora (USD)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Ej. 15" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button type="submit">Guardar Cambios</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

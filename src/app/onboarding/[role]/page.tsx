'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { serviceTypes } from '@/lib/mock-data';

const customerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  location: z.string().min(3, { message: 'La ubicación es requerida.' }),
  serviceType: z.string({ required_error: 'Por favor seleccione un tipo de servicio.' }),
});

const workerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  serviceType: z.string({ required_error: 'Por favor seleccione un tipo de servicio.' }),
  rate: z.coerce.number().min(1, { message: 'La tarifa debe ser mayor a 0.' }),
  availability: z.string().min(10, { message: 'Por favor describa su disponibilidad.' }),
  workZone: z.string().min(3, { message: 'La zona de trabajo es requerida.' }),
});

type OnboardingPageProps = {
  params: { role: 'customer' | 'worker' };
};

export default function OnboardingPage({ params }: OnboardingPageProps) {
  const { role } = params;
  const router = useRouter();
  const isCustomer = role === 'customer';

  const form = useForm({
    resolver: zodResolver(isCustomer ? customerSchema : workerSchema),
    defaultValues: isCustomer
      ? { name: '', location: '', serviceType: undefined }
      : { name: '', serviceType: undefined, rate: 0, availability: '', workZone: '' },
  });

  const onSubmit = () => {
    // This is a mock submission
    if (isCustomer) {
      router.push('/customer/dashboard');
    } else {
      router.push('/worker/dashboard');
    }
  };

  const title = isCustomer ? 'Registro de Cliente' : 'Registro de Trabajador';
  const description = 'Complete sus datos para continuar.';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isCustomer && (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicación aproximada</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. Palermo, Buenos Aires" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {isCustomer
                        ? 'Tipo de servicio que suele necesitar'
                        : 'Tipo de servicio ofrecido'}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un servicio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isCustomer && (
                <>
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
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horarios disponibles</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ej. Lunes a Viernes, 9am - 5pm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zona de trabajo</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej. CABA y GBA Norte" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button type="submit" className="w-full" size="lg">
                Finalizar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

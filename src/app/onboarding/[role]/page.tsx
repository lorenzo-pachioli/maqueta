'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { serviceTypes } from '@/lib/mock-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// --- Availability Picker Component ---
const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const hours = Array.from({ length: 17 }, (_, i) => i + 7); // 7am to 11pm (23:00)

type AvailabilityPickerProps = {
  selectedSlots: string[];
  onChange: (selectedSlots: string[]) => void;
};

function AvailabilityPicker({ selectedSlots, onChange }: AvailabilityPickerProps) {
  const handleSlotToggle = (slotId: string) => {
    const newSelectedSlots = selectedSlots.includes(slotId)
      ? selectedSlots.filter((s) => s !== slotId)
      : [...selectedSlots, slotId];
    onChange(newSelectedSlots);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          {selectedSlots.length > 0
            ? `${selectedSlots.length} horas seleccionadas`
            : 'Seleccionar horarios'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Disponibilidad Semanal</DialogTitle>
          <CardDescription>
            Haz click en los recuadros para marcar tus horas de trabajo.
          </CardDescription>
        </DialogHeader>
        <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-1 text-xs">
          <div />
          {days.map((day) => (
            <div key={day} className="text-center font-semibold p-2">
              {day.substring(0, 3)}
            </div>
          ))}

          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="text-right font-semibold p-2">{`${hour
                .toString()
                .padStart(2, '0')}:00`}</div>
              {days.map((day, dayIndex) => {
                const slotId = `${dayIndex}-${hour}`;
                const isSelected = selectedSlots.includes(slotId);
                return (
                  <button
                    type="button"
                    key={slotId}
                    onClick={() => handleSlotToggle(slotId)}
                    className={cn(
                      'h-8 rounded-sm border transition-colors',
                      isSelected
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted/40 hover:bg-muted'
                    )}
                    aria-label={`Seleccionar ${day} a las ${hour}:00`}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Guardar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// --- End Availability Picker Component ---

const customerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  location: z.string().min(3, { message: 'La ubicación es requerida.' }),
});

const workerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  serviceType: z.string({
    required_error: 'Por favor seleccione un tipo de servicio.',
  }),
  rate: z.coerce.number().min(1, { message: 'La tarifa debe ser mayor a 0.' }),
  availability: z
    .array(z.string())
    .nonempty({ message: 'Por favor, seleccione al menos un bloque horario.' }),
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
      ? { name: '', location: '' }
      : {
          name: '',
          serviceType: undefined,
          rate: 0,
          availability: [],
          workZone: '',
        },
  });

  const onSubmit = (data: any) => {
    console.log(data);
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
                        <Input
                          placeholder="Ej. Palermo, Buenos Aires"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!isCustomer && (
                <>
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de servicio ofrecido</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                      <FormItem className="flex flex-col">
                        <FormLabel>Horarios disponibles</FormLabel>
                        <FormControl>
                          <AvailabilityPicker
                            selectedSlots={field.value ?? []}
                            onChange={field.onChange}
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
                          <Input
                            placeholder="Ej. CABA y GBA Norte"
                            {...field}
                          />
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

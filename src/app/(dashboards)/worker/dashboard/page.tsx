'use client';

import { DollarSign, List, Clock, Power } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function WorkerDashboardPage() {
  const [isAvailable, setIsAvailable] = React.useState(true);

  return (
    <div className="p-4 space-y-6">
      <header className="pt-6">
        <h1 className="text-3xl font-bold">Panel de Trabajador</h1>
        <p className="text-muted-foreground">Gestiona tu perfil y disponibilidad.</p>
      </header>

      <Card className="bg-primary/20 border-primary/50">
        <CardHeader className="flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Estado</CardTitle>
          <Power className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="availability-switch"
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
            <Label htmlFor="availability-switch" className="text-lg font-semibold">
              {isAvailable ? 'Disponible' : 'No Disponible'}
            </Label>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tarifa por Hora</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15.00</div>
            <p className="text-xs text-muted-foreground">Configurada en tu perfil</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Servicios</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Transporte, Entregas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Horarios Disponibles</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="font-medium">Lunes a Viernes</p>
          <p className="text-sm text-muted-foreground">9:00 AM - 5:00 PM</p>
        </CardContent>
      </Card>

    </div>
  );
}

'use client';

import { DollarSign, List, Clock, Power, BarChart2, MessageSquare } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChatMock } from '@/components/shared/chat-mock';

const earningsData = [
  { name: 'Lun', total: Math.floor(Math.random() * 200) + 50 },
  { name: 'Mar', total: Math.floor(Math.random() * 200) + 50 },
  { name: 'Mié', total: Math.floor(Math.random() * 200) + 50 },
  { name: 'Jue', total: Math.floor(Math.random() * 200) + 50 },
  { name: 'Vie', total: Math.floor(Math.random() * 200) + 50 },
  { name: 'Sáb', total: Math.floor(Math.random() * 200) + 50 },
  { name: 'Dom', total: 0 },
];

type MockRequest = {
  id: number;
  user: string;
  service: string;
  time: string;
};

const mockRequests: MockRequest[] = [
    { id: 1, user: 'Ana', service: 'Entrega de Paquetes', time: '14:00' },
    { id: 2, user: 'Pedro', service: 'Transporte Personal', time: '16:30' },
]

export default function WorkerDashboardPage() {
  const [isAvailable, setIsAvailable] = React.useState(true);
  const [selectedRequest, setSelectedRequest] = React.useState<MockRequest | null>(null);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <header className="pt-6 md:pt-0">
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
              {isAvailable ? 'Disponible para trabajos' : 'No Disponible'}
            </Label>
          </div>
        </CardContent>
      </Card>

      <section>
          <h2 className="text-xl font-semibold mb-4">Solicitudes Entrantes</h2>
           <div className="space-y-4">
              {mockRequests.map(req => (
                  <Card key={req.id} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedRequest(req)}>
                      <CardContent className="p-4 flex items-center justify-between">
                          <div>
                              <p className="font-semibold">{req.service} para {req.user}</p>
                              <p className="text-sm text-muted-foreground">Hoy a las {req.time}</p>
                          </div>
                           <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageSquare className="h-5 w-5"/>
                            <span>Chatear</span>
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </section>
      
      <Card>
        <CardHeader>
            <CardTitle className='flex items-center gap-2'><BarChart2 className="h-5 w-5"/> Ganancias de la Semana</CardTitle>
            <CardDescription>$348.50 esta semana</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={200}>
            <BarChart data={earningsData}>
                <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
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
      
      <Dialog open={!!selectedRequest} onOpenChange={(isOpen) => !isOpen && setSelectedRequest(null)}>
        <DialogContent className="max-w-lg p-0">
          {selectedRequest && <ChatMock contactName={selectedRequest.user} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

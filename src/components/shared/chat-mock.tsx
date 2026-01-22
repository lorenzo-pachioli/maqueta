'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import React from 'react';

const messages = [
  { id: 1, sender: 'client', text: 'Hola! Necesito que pases a buscar un paquete por la oficina.' },
  { id: 2, sender: 'worker', text: 'Hola Ana! Claro, a qué hora sería?' },
  { id: 3, sender: 'client', text: 'Puede ser a las 14:30?' },
  { id: 4, sender: 'worker', text: 'Perfecto, a esa hora estoy ahí. La dirección es la que figura en tu perfil?' },
  { id: 5, sender: 'client', text: 'Si, exacto. Av. Corrientes 1234, 5to A.' },
];

type ChatMockProps = {
    contactName: string;
}

export function ChatMock({ contactName }: ChatMockProps) {
    const [newMessage, setNewMessage] = React.useState('');

  return (
    <div className="flex flex-col h-[60vh]">
        <header className="p-4 border-b">
            <h2 className="text-lg font-semibold">Chat con {contactName}</h2>
        </header>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === 'worker' ? 'justify-end' : ''
              }`}
            >
              {msg.sender === 'client' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{contactName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  msg.sender === 'worker'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            autoComplete="off"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

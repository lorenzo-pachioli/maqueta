import { PlaceHolderImages } from './placeholder-images';

export type Worker = {
  id: string;
  name: string;
  serviceType: 'Transporte Personal' | 'Mudanza Ligera' | 'Entrega de Paquetes';
  rating: number;
  pricePerHour: number;
  distance: number; // in km
  avatarUrl: string;
  imageHint: string;
};

const workerAvatars = PlaceHolderImages.filter(img => img.id.startsWith('worker-'));

export const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Carlos Gomez',
    serviceType: 'Transporte Personal',
    rating: 4.9,
    pricePerHour: 15,
    distance: 2.5,
    avatarUrl: workerAvatars.find(a => a.id === 'worker-1')?.imageUrl || '',
    imageHint: workerAvatars.find(a => a.id === 'worker-1')?.imageHint || '',
  },
  {
    id: '2',
    name: 'Ana Rodriguez',
    serviceType: 'Entrega de Paquetes',
    rating: 4.8,
    pricePerHour: 12,
    distance: 1.8,
    avatarUrl: workerAvatars.find(a => a.id === 'worker-2')?.imageUrl || '',
    imageHint: workerAvatars.find(a => a.id === 'worker-2')?.imageHint || '',
  },
  {
    id: '3',
    name: 'Luisa Fernandez',
    serviceType: 'Mudanza Ligera',
    rating: 5.0,
    pricePerHour: 25,
    distance: 5.1,
    avatarUrl: workerAvatars.find(a => a.id === 'worker-3')?.imageUrl || '',
    imageHint: workerAvatars.find(a => a.id === 'worker-3')?.imageHint || '',
  },
  {
    id: '4',
    name: 'Javier Torres',
    serviceType: 'Transporte Personal',
    rating: 4.7,
    pricePerHour: 14,
    distance: 3.2,
    avatarUrl: workerAvatars.find(a => a.id === 'worker-4')?.imageUrl || '',
    imageHint: workerAvatars.find(a => a.id === 'worker-4')?.imageHint || '',
  },
  {
    id: '5',
    name: 'Pedro Morales',
    serviceType: 'Entrega de Paquetes',
    rating: 4.9,
    pricePerHour: 13,
    distance: 4.5,
    avatarUrl: workerAvatars.find(a => a.id === 'worker-5')?.imageUrl || '',
    imageHint: workerAvatars.find(a => a.id === 'worker-5')?.imageHint || '',
  },
  {
    id: '6',
    name: 'Sofia Castillo',
    serviceType: 'Transporte Personal',
    rating: 4.8,
    pricePerHour: 16,
    distance: 6.0,
    avatarUrl: workerAvatars.find(a => a.id === 'worker-6')?.imageUrl || '',
    imageHint: workerAvatars.find(a => a.id === 'worker-6')?.imageHint || '',
  },
];

export const serviceTypes = [
  'Transporte Personal',
  'Mudanza Ligera',
  'Entrega de Paquetes',
];

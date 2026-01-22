import { Car, Package, Clock, ShoppingBag, Bike, Move3d } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

export type Worker = {
  id: string;
  name: string;
  serviceType: string;
  rating: number;
  pricePerHour: number;
  distance: number; // in km
  avatarUrl: string;
  imageHint: string;
  lat: number;
  lng: number;
};

const workerAvatars = PlaceHolderImages.filter(img => img.id.startsWith('worker-'));

export const serviceCategories = [
  {
    name: "A donde vayas",
    services: [
      { name: 'Transporte Personal', icon: Car },
      { name: 'Entrega de Paquetes', icon: Package },
      { name: 'Alquiler por hora', icon: Clock },
      { name: 'Dos ruedas', icon: Bike },
    ]
  },
  {
    name: "Todo lo que necesites",
    services: [
      { name: 'Mandados', icon: ShoppingBag },
      { name: 'Mudanza Ligera', icon: Move3d },
    ]
  }
];

export const serviceTypes = serviceCategories.flatMap(category => category.services.map(s => s.name));

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
    lat: 30,
    lng: 25,
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
    lat: 50,
    lng: 60,
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
    lat: 75,
    lng: 30,
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
    lat: 80,
    lng: 70,
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
    lat: 20,
    lng: 80,
  },
  {
    id: '6',
    name: 'Sofia Castillo',
    serviceType: 'Alquiler por hora',
    rating: 4.8,
    pricePerHour: 16,
    distance: 6.0,
    avatarUrl: workerAvatars.find(a => a.id === 'worker-6')?.imageUrl || '',
    imageHint: workerAvatars.find(a => a.id === 'worker-6')?.imageHint || '',
    lat: 45,
    lng: 10,
  },
  {
    id: '7',
    name: 'Mateo Rojas',
    serviceType: 'Mandados',
    rating: 4.9,
    pricePerHour: 10,
    distance: 1.2,
    avatarUrl: workerAvatars.find(a => a.id === 'worker-7')?.imageUrl || '',
    imageHint: workerAvatars.find(a => a.id === 'worker-7')?.imageHint || '',
    lat: 60,
    lng: 85,
  },
  {
    id: '8',
    name: 'Valentina Peña',
    serviceType: 'Dos ruedas',
    rating: 4.7,
    pricePerHour: 9,
    distance: 0.8,
    avatarUrl: workerAvatars.find(a => a.id === 'worker-8')?.imageUrl || '',
    imageHint: workerAvatars.find(a => a.id === 'worker-8')?.imageHint || '',
    lat: 10,
    lng: 50,
  },
];

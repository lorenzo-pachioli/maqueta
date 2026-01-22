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
  availability: string[];
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

const sampleAvailability1 = ['0-9','0-10','0-11','0-12','1-9','1-10','1-11','1-12','2-14','2-15','2-16','3-18','3-19','3-20'];
const sampleAvailability2 = ['3-9','3-10','4-9','4-10','4-11','5-13','5-14','5-15','5-16','5-17','6-13','6-14','6-15','6-16','6-17'];
const sampleAvailability3 = ['0-8','0-9','0-10','1-8','1-9','1-10','2-8','2-9','2-10','3-8','3-9','3-10','4-8','4-9','4-10'];
const sampleAvailability4 = ['1-18','1-19','1-20','1-21','2-18','2-19','2-20','2-21','3-18','3-19','3-20','3-21'];
const sampleAvailability5 = ['0-10','0-11','0-12','0-13','0-14','0-15','0-16','0-17','1-10','1-11','1-12','1-13','1-14','1-15','1-16','1-17'];
const sampleAvailability6 = ['5-8','5-9','5-10','5-11','5-12','5-13','5-14','5-15','5-16','5-17','5-18','5-19','6-8','6-9','6-10','6-11','6-12','6-13','6-14','6-15','6-16','6-17','6-18','6-19'];
const sampleAvailability7 = ['0-13', '0-14', '0-15', '0-16', '1-13', '1-14', '1-15', '1-16', '2-13', '2-14', '2-15', '2-16'];
const sampleAvailability8 = ['4-10', '4-11', '4-12', '5-10', '5-11', '5-12', '5-13', '5-14', '6-10', '6-11', '6-12', '6-13', '6-14'];


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
    availability: sampleAvailability1,
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
    availability: sampleAvailability2,
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
    availability: sampleAvailability3,
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
    availability: sampleAvailability4,
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
    availability: sampleAvailability5,
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
    availability: sampleAvailability6,
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
    availability: sampleAvailability7,
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
    availability: sampleAvailability8,
  },
];

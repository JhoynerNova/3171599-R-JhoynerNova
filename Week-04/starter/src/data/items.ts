// ============================================
// MOCK DATA PARA PAQUETES
// ============================================
import { Package, PackageStatus, SortOption } from '../types';

export const items: Package[] = [
  {
    id: 1,
    trackingNumber: 'TRK123456789',
    origin: 'Bogotá, Colombia',
    destination: 'Bogotá, Colombia (Usaquén)',
    status: 'in-transit',
    weightKg: 2.5,
    isInsured: false,
    shippedAt: '2026-02-25',
    expectedDelivery: '2026-03-05',
  },
  {
    id: 2,
    trackingNumber: 'TRK987654321',
    origin: 'Bogotá, Colombia (Chapinero)',
    destination: 'Medellín, Colombia',
    status: 'pending',
    weightKg: 1.2,
    isInsured: true,
    shippedAt: '2026-02-28',
  },
  {
    id: 3,
    trackingNumber: 'TRK555666777',
    origin: 'Cali, Colombia',
    destination: 'Bogotá, Colombia (Suba)',
    status: 'delivered',
    weightKg: 5.0,
    isInsured: true,
    shippedAt: '2026-01-10',
    expectedDelivery: '2026-01-20',
  },
  {
    id: 4,
    trackingNumber: 'TRK111222333',
    origin: 'Barranquilla, Colombia',
    destination: 'Bogotá, Colombia (Kennedy)',
    status: 'in-transit',
    weightKg: 0.8,
    isInsured: false,
    shippedAt: '2026-03-01',
    expectedDelivery: '2026-03-04',
  },
  {
    id: 5,
    trackingNumber: 'TRK444555666',
    origin: 'Bogotá, Colombia',
    destination: 'Bogotá, Colombia (Usme)',
    status: 'lost',
    weightKg: 3.3,
    isInsured: true,
    shippedAt: '2026-02-15',
  },
];

// Estados disponibles como categorías
export const categories: { value: PackageStatus; label: string }[] = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'pending', label: '🚚 Pendiente' },
  { value: 'in-transit', label: '✈️ En tránsito' },
  { value: 'delivered', label: '📬 Entregado' },
  { value: 'lost', label: '⚠️ Perdido' },
];

// Opciones de ordenamiento adaptadas
export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'tracking-asc', label: 'Tracking (A-Z)' },
  { value: 'tracking-desc', label: 'Tracking (Z-A)' },
  { value: 'weight-asc', label: 'Peso (menor a mayor)' },
  { value: 'weight-desc', label: 'Peso (mayor a menor)' },
  { value: 'date-asc', label: 'Fecha (más antiguo)' },
  { value: 'date-desc', label: 'Fecha (más reciente)' },
];
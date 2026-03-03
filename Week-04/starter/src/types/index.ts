// ============================================
// TIPOS E INTERFACES
// ============================================
// Adapta estos tipos a tu dominio asignado

// ============================================
// DOMINIO: SISTEMA DE SEGUIMIENTO DE PAQUETES
// ============================================
// Renombramos las entidades y tipos para reflejar envíos/paquetes

export interface Package {
  id: number;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: PackageStatus; // ej: in-transit, delivered, pending
  weightKg: number;
  isInsured: boolean;
  shippedAt: string;   // ISO date
  expectedDelivery?: string;
}

// categorías de paquetes (pueden reutilizarse como estados)
export type PackageStatus =
  | 'all'
  | 'pending'
  | 'in-transit'
  | 'delivered'
  | 'lost';

// opciones de ordenamiento en el catálogo
export type SortOption =
  | 'tracking-asc'
  | 'tracking-desc'
  | 'weight-asc'
  | 'weight-desc'
  | 'date-asc'
  | 'date-desc';

// Estado de los filtros
export interface FilterState {
  searchTerm: string;
  status: PackageStatus;
  showOnlyInsured: boolean;
  sortBy: SortOption;
  minWeight?: number;
  maxWeight?: number;
}

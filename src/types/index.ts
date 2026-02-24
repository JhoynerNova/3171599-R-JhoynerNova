// ============================================
// TIPOS Y INTERFACES DEL PROYECTO
// ============================================
// Adapta estas interfaces a tu dominio asignado

// NOTA PARA EL APRENDIZ:
// Estas interfaces son genéricas. Debes personalizarlas según tu dominio.
// Ejemplos:
// - Biblioteca: Book con { id, title, author, isbn, available }
// - Farmacia: Medicine con { id, name, price, stock, expirationDate }
// - Gimnasio: Member con { id, name, membershipType, joinDate, active }
// - Restaurante: Dish con { id, name, category, price, available }

/**
 * Interfaz principal para elementos de tu dominio
 * TODO: Renombrar y adaptar a tu contexto
 *
 * Ejemplos por dominio:
 * - Book (biblioteca)
 * - Medicine (farmacia)
 * - Member (gimnasio)
 * - Dish (restaurante)
 */
// Para este proyecto usamos el dominio: Sistema de seguimiento de paquetes
export interface Item {
  id: number;
  trackingNumber: string;
  status: 'Pending' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Exception';
  origin: string;
  destination: string;
  lastLocation?: string;
  lastUpdated: string; // ISO timestamp
  estimatedDelivery?: string; // ISO timestamp opcional
  // description se mantiene para compatibilidad visual
  description?: string;
}

/**
 * Interfaz para estadísticas del dashboard
 * TODO: Adaptar métricas a tu dominio
 *
 * Ejemplos por dominio:
 * - Biblioteca: totalBooks, borrowedToday, availableRooms
 * - Farmacia: totalProducts, dailySales, lowStockItems
 * - Gimnasio: totalMembers, todayAttendance, activeClasses
 * - Restaurante: totalDishes, activeOrders, averageRating
 */
export interface Stats {
  totalParcels: number;
  inTransit: number;
  delivered: number;
  deliveredPercentage: number; // 0-100
}

/**
 * Interfaz para datos en tiempo real
 * TODO: Definir qué dato de tu dominio se actualiza en tiempo real
 *
 * Ejemplos por dominio:
 * - Biblioteca: roomOccupancy (ocupación de salas)
 * - Farmacia: pendingOrders (pedidos pendientes)
 * - Gimnasio: currentOccupancy (personas en el gimnasio ahora)
 * - Restaurante: occupiedTables (mesas ocupadas)
 */
export interface RealTimeData {
  value: number; // por ejemplo: número de paquetes en tránsito
  label: string;
  unit: string; // ej: "paquetes"
  lastUpdated: string; // ISO timestamp
}

/**
 * Estado genérico para manejar peticiones asíncronas
 * No necesitas modificar esta interfaz
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Tipo para filtros de búsqueda (opcional)
 * TODO: Agregar filtros relevantes a tu dominio si implementas búsqueda
 */
export interface SearchFilters {
  query: string;
  // TODO: Agregar campos de filtro específicos
  // Ejemplos:
  // - Biblioteca: category: string, available: boolean
  // - Farmacia: priceRange: [number, number], inStock: boolean
  // - Gimnasio: membershipType: string, active: boolean
}

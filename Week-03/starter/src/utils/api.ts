// ============================================
// FUNCIONES DE API Y DATOS MOCK
// ============================================
// Implementa funciones para obtener datos de tu dominio

import type { Item, Stats, RealTimeData } from '../types';

// ============================================
// CONFIGURACIÓN
// ============================================

// TODO: Configura la URL base de tu API o usa datos mock
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Cambiar si usas API real

// Helper para simular latencia de red (útil con datos mock)
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// DATOS MOCK (EJEMPLO)
// ============================================

// TODO: Reemplaza estos datos mock con datos de tu dominio
// Ejemplos por dominio:
// - Biblioteca: MOCK_BOOKS
// - Farmacia: MOCK_MEDICINES
// - Gimnasio: MOCK_MEMBERS
// - Restaurante: MOCK_DISHES

const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    trackingNumber: 'PKG-100001',
    status: 'In Transit',
    origin: 'Madrid, ES',
    destination: 'Barcelona, ES',
    lastLocation: 'Zaragoza',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    description: 'Paquete estándar 2kg',
  },
  {
    id: 2,
    trackingNumber: 'PKG-100002',
    status: 'Out for Delivery',
    origin: 'Valencia, ES',
    destination: 'Alicante, ES',
    lastLocation: 'Alicante - Oficina Local',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
    description: 'Documento prioritario',
  },
  {
    id: 3,
    trackingNumber: 'PKG-100003',
    status: 'Delivered',
    origin: 'Sevilla, ES',
    destination: 'Cádiz, ES',
    lastLocation: 'Cádiz',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    estimatedDelivery: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(),
    description: 'Electrónica',
  },
  {
    id: 4,
    trackingNumber: 'PKG-100004',
    status: 'Pending',
    origin: 'Bilbao, ES',
    destination: 'Santander, ES',
    lastLocation: 'Bilbao',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    description: 'Ropa',
  },
  {
    id: 5,
    trackingNumber: 'PKG-100005',
    status: 'Exception',
    origin: 'A Coruña, ES',
    destination: 'Lugo, ES',
    lastLocation: 'Oficina central',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    description: 'Paquete dañado - investigar',
  },
];

// ============================================
// FUNCIONES DE FETCH
// ============================================

/**
 * Obtiene la lista principal de elementos
 * TODO: Implementar fetch real o retornar datos mock adaptados a tu dominio
 *
 * @param signal - AbortSignal para cancelar la petición
 * @returns Promise con array de Items
 *
 * Ejemplos por dominio:
 * - fetchBooks: retorna libros de la biblioteca
 * - fetchMedicines: retorna medicamentos de la farmacia
 * - fetchMembers: retorna miembros del gimnasio
 * - fetchDishes: retorna platillos del restaurante
 */
export const fetchItems = async (signal?: AbortSignal): Promise<Item[]> => {
  // Simulamos latencia y respetamos cancelación por AbortSignal
  return new Promise<Item[]>(async (resolve, reject) => {
    if (signal?.aborted) {
      const err = new Error('Aborted');
      // marcar nombre para que el frontend detecte AbortError
      err.name = 'AbortError';
      return reject(err);
    }

    const onAbort = () => {
      const err = new Error('Aborted');
      err.name = 'AbortError';
      reject(err);
    };

    signal?.addEventListener?.('abort', onAbort);

    try {
      await delay(900);
      resolve(MOCK_ITEMS);
    } catch (e) {
      reject(e);
    } finally {
      signal?.removeEventListener?.('abort', onAbort);
    }
  });
};

/**
 * Obtiene estadísticas del dominio
 * TODO: Implementar lógica para calcular/obtener stats de tu dominio
 *
 * @returns Promise con objeto Stats
 *
 * Ejemplos por dominio:
 * - Biblioteca: totalBooks, borrowedToday, availablePercentage
 * - Farmacia: totalProducts, salesCount, lowStockPercentage
 * - Gimnasio: totalMembers, todayAttendance, occupancyPercentage
 */
export const fetchStats = async (): Promise<Stats> => {
  await delay(600);

  const total = MOCK_ITEMS.length;
  const delivered = MOCK_ITEMS.filter((m) => m.status === 'Delivered').length;
  const inTransit = MOCK_ITEMS.filter((m) => m.status === 'In Transit' || m.status === 'Out for Delivery').length;
  const deliveredPercentage = total > 0 ? Math.round((delivered / total) * 100) : 0;

  return {
    totalParcels: total,
    inTransit,
    delivered,
    deliveredPercentage,
  };
};

/**
 * Obtiene datos en tiempo real que se actualizan periódicamente
 * TODO: Implementar fetch de dato que cambia frecuentemente
 *
 * @returns Promise con RealTimeData
 *
 * Ejemplos por dominio:
 * - Biblioteca: roomOccupancy (cuántas personas en salas de lectura)
 * - Farmacia: pendingOrders (pedidos sin procesar)
 * - Gimnasio: currentOccupancy (personas actualmente en el gimnasio)
 * - Restaurante: occupiedTables (mesas ocupadas ahora)
 */
export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(400);

  // Valor real: número de paquetes en tránsito (In Transit + Out for Delivery)
  const inTransit = MOCK_ITEMS.filter((m) => m.status === 'In Transit' || m.status === 'Out for Delivery').length;

  // Añadimos una pequeña variación aleatoria para simular cambios frecuentes
  const variation = Math.floor(Math.random() * 3) - 1; // -1,0,1
  const value = Math.max(0, inTransit + variation);

  return {
    value,
    label: 'Paquetes en tránsito',
    unit: 'paquetes',
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Busca items por query (opcional)
 * TODO: Implementar si tu dashboard incluye búsqueda/filtrado
 *
 * @param query - Término de búsqueda
 * @returns Promise con array filtrado de Items
 */
export const searchItems = async (query: string): Promise<Item[]> => {
  // TODO: Implementar búsqueda

  await delay(600);

  if (!query.trim()) {
    return MOCK_ITEMS;
  }

  // Filtrado simple por nombre
  return MOCK_ITEMS.filter((item) =>
    (item.trackingNumber + ' ' + (item.description || '') + ' ' + item.origin + ' ' + item.destination)
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
};

// ============================================
// EJEMPLO DE USO DE JSONPlaceholder API
// ============================================

/**
 * Ejemplo de cómo adaptar JSONPlaceholder a tu dominio
 * Descomenta y modifica según necesites
 */

// export const fetchItemsFromAPI = async (
//   signal?: AbortSignal,
// ): Promise<Item[]> => {
//   const response = await fetch(
//     'https://jsonplaceholder.typicode.com/users',
//     { signal },
//   );
//
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//
//   const users = await response.json();
//
//   // Transforma datos de API a tu interfaz Item
//   return users.map((user: any) => ({
//     id: user.id,
//     name: user.name,
//     description: user.email,
//     // Agrega más propiedades según tu dominio
//   }));
// };

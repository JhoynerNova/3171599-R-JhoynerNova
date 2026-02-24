// ============================================
// TYPES: INTERFACES Y TIPOS
// ============================================
// Define aquí las interfaces para tu dominio: Seguimiento de Paquetes

/**
 * Interface principal: Package
 * Representa un paquete dentro del sistema de logística y transporte.
 */
export interface Package {
  id: number;                // Identificador único
  trackingNumber: string;    // Número de seguimiento
  sender: string;            // Remitente
  recipient: string;         // Destinatario
  status: 'pendiente' | 'en tránsito' | 'entregado'; // Estado del paquete
  weight: number;            // Peso en kg
}

/**
 * Interface opcional para datos de formulario
 * Igual que Package pero sin el id (se genera automáticamente al agregar).
 */
export type PackageFormData = Omit<Package, 'id'>;
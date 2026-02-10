// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// ============================================

console.log('🏛️ PROYECTO SEMANAL: MODELADO DE ENTIDADES\n');

// INSTRUCCIONES:
// Adapta este archivo a tu dominio asignado (Sistema de seguimiento de paquetes | Logística y Transporte.)
// Implementa las entidades, tipos y funciones siguiendo los TODOs y comentarios.
// Usa interfaces, types, type unions y literales. Comenta el código con qué/para/impacto.

// ============================================
// 1. Define las entidades principales de tu dominio
// ============================================

// TODO: Define una interface para la entidad principal (ej: Book, Medicine, Member, Dish)
// QUÉ: Representa el paquete en transito
// PARA: Modelar información básica de cada envio
// IMPACTO: Permite rastrear y gestionar el estado de los paquetes
interface Package {
    id: string;
    weightKg: number;
    dimensions: {
        lengthCm: number;
        widthCm: number;
        heightCm: number;
  };
    status: PackageStatus;
    destination: Address;
    carrier: Carrier;
}

// TODO: Define al menos otra interface relacionada (ej: Author, Sale, Routine, Table)
// QUÉ: Define la ubicación de origen o destino
// PARA: Asociar paquetes con lugares específicos
// IMPACTO: Facilita la logística y entrega
interface Address {
    street: string;
    city: string;
    country: string;
}

// QUÉ: Representa la empresa o persona que transporta el paquete 
// PARA: Asignar responsabilidad del envío 
// IMPACTO: Permite saber quién está a cargo del transporte 
interface Carrier { 
    name: string; 
    type: CarrierType; 
}

// ============================================
// 2. Usa type unions y literales para propiedades clave
// ============================================

// TODO: Define un type union para un estado, categoría o rol relevante
// QUÉ: Estados posibles de un paquete
// PARA: Controlar el flujo logístico
// IMPACTO: Permite filtrar y gestionar paquetes según su estado
type PackageStatus = 'pending' | 'in_transit' | 'delivered' | 'returned';

// TODO: Usa un type literal para limitar valores permitidos
// QUÉ: Tipos de transportistas
// PARA: Diferenciar entre empresas y particulares
// IMPACTO: Aporta flexibilidad al sistema
type CarrierType = 'company' | 'independent';

// ============================================
// 3. Implementa funciones tipadas para operaciones básicas
// ============================================

// TODO: Implementa una función que cree una entidad
// QUÉ: Crear un nuevo paquete
// PARA: Simular la creación de envíos
// IMPACTO: Permite inicializar datos de prueba
function createPackage(
  id: string,
  weightKg: number,
  dimensions: { lengthCm: number; widthCm: number; heightCm: number },
  destination: Address,
  carrier: Carrier
): Package {
  return {
    id,
    weightKg,
    dimensions,
    status: 'pending',
    destination,
    carrier,
  };
}

// TODO: Implementa una función que liste entidades
// QUÉ: Listar paquetes
// PARA: Mostrar todos los envíos registrados
// IMPACTO: Facilita la visualización de datos
function listPackages(packages: Package[]): Package[] {
  return packages;
}

// TODO: Implementa una función que filtre entidades por status/categoría
// QUÉ: Filtrar paquetes por estado
// PARA: Obtener solo los que cumplen cierta condición
// IMPACTO: Mejora la gestión logística
function filterByStatus(packages: Package[], status: PackageStatus): Package[] {
  return packages.filter((p) => p.status === status);
}

// ============================================
// 4. Prueba tus funciones con datos de ejemplo
// ============================================

// TODO: Crea algunos objetos de ejemplo y prueba las funciones
const sampleAddress: Address = {
  street: 'calle 183 A # 2-18',
  city: 'Bogotá',
  country: 'Colombia',
};

const sampleCarrier: Carrier = {
  name: 'Transportes Nova S.A.',
  type: 'company',
};

const pkg1 = createPackage('PKG001', 5, { lengthCm: 30, widthCm: 20, heightCm: 15 }, sampleAddress, sampleCarrier);
const pkg2 = createPackage('PKG002', 10, { lengthCm: 50, widthCm: 40, heightCm: 25 }, sampleAddress, sampleCarrier);
pkg2.status = 'in_transit';

const packages = [pkg1, pkg2];

console.log('All packages:', listPackages(packages));
console.log('Packages in transit:', filterByStatus(packages, 'in_transit'));








import { useState } from 'react';
import { Package } from './types';
import Header from './components/Header';
import PackageForm from './components/PackageForm';
import PackageList from './components/PackageList';

/**
 * COMPONENTE PRINCIPAL: App
 *
 * Este componente gestiona el estado global de la aplicación
 * y coordina la comunicación entre componentes hijos.
 */
const App = () => {
  // ============================================
  // ESTADO PRINCIPAL
  // ============================================

  // Estado para la lista de paquetes
  // Tip: Usa useState<Package[]>([])
  const [packages, setPackages] = useState<Package[]>([]);

  // Estado para edición (id del paquete siendo editado)
  // Tip: Usa useState<number | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null);

  // ============================================
  // FUNCIONES CRUD
  // ============================================

  /**
   * Agregar nuevo paquete
   * @param pkg - Datos del nuevo paquete (sin id)
   */
  const addPackage = (pkg: Omit<Package, 'id'>): void => {
    // 1. Crear nuevo objeto con id único (Date.now())
    // 2. Agregar al array con spread operator: [...packages, newPackage]
    // 3. Usar setPackages para actualizar el estado
    const newPackage: Package = {
      ...pkg,
      id: Date.now(),
    };
    setPackages([...packages, newPackage]);
  };

  /**
   * Actualizar paquete existente
   * @param id - ID del paquete a actualizar
   * @param updates - Propiedades a actualizar
   */
  const updatePackage = (id: number, updates: Partial<Package>): void => {
    // 1. Usar map() para recorrer packages
    // 2. Si pkg.id === id, crear nuevo objeto con {...pkg, ...updates}
    // 3. Si no, mantener el pkg sin cambios
    // 4. Usar setPackages con el nuevo array
    setPackages(
      packages.map((pkg) => (pkg.id === id ? { ...pkg, ...updates } : pkg))
    );
  };

  /**
   * Eliminar paquete
   * @param id - ID del paquete a eliminar
   */
  const deletePackage = (id: number): void => {
    // 1. Usar filter() para crear nuevo array sin el paquete
    // 2. Condición: pkg.id !== id
    // 3. Usar setPackages con el nuevo array
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  /**
   * Preparar paquete para edición
   * @param id - ID del paquete a editar
   */
  const startEdit = (id: number): void => {
    // Simplemente actualiza el estado editingId con el id recibido
    setEditingId(id);
  };

  /**
   * Cancelar edición
   */
  const cancelEdit = (): void => {
    // Simplemente actualiza el estado editingId a null
    setEditingId(null);
  };

  // ============================================
  // ELEMENTO SIENDO EDITADO
  // ============================================

  // Encontrar el paquete que se está editando
  // Tip: Usa find() con editingId
  const packageToEdit = editingId
    ? packages.find((pkg) => pkg.id === editingId)
    : undefined;

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="app">
      {/* Header con título y descripción */}
      <Header />

      <div className="container">
        {/* Formulario para agregar/editar */}
        <PackageForm
          onAdd={addPackage}
          onUpdate={updatePackage}
          editingPackage={packageToEdit}
          onCancelEdit={cancelEdit}
        />

        {/* Lista de paquetes */}
        <PackageList
          packages={packages}
          onDelete={deletePackage}
          onEdit={startEdit}
        />
      </div>
    </div>
  );
};

export default App;
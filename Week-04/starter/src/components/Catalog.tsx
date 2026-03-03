// ============================================
// COMPONENTE: Catalog (Principal)
// ============================================
// Orquesta todos los componentes del catálogo

import React, { useState, useMemo } from 'react';
import { Package, PackageStatus, SortOption } from '../types';
import { items as initialItems } from '../data/items';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { SortSelector } from './SortSelector';
import { ItemList } from './ItemList';

/**
 * Componente principal del catálogo
 */
export const Catalog: React.FC = () => {
  // ============================================
  // ESTADOS
  // ============================================

  // Datos
  const [items, setItems] = useState<Package[]>(initialItems);

  // Estados de UI
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<PackageStatus>('all');
  const [showOnlyInsured, setShowOnlyInsured] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('tracking-asc');

  // Debounce para búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // ============================================
  // PROCESAMIENTO DE DATOS
  // ============================================

  // Filtrado, búsqueda y ordenamiento
  const processedItems = useMemo(() => {
    let result = [...items];

    // 1. búsqueda en varios campos
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter((p) =>
        p.trackingNumber.toLowerCase().includes(term) ||
        p.origin.toLowerCase().includes(term) ||
        p.destination.toLowerCase().includes(term)
      );
    }

    // 2. filtro por estado (status)
    if (selectedStatus !== 'all') {
      result = result.filter((p) => p.status === selectedStatus);
    }

    // 3. filtro por seguro
    if (showOnlyInsured) {
      result = result.filter((p) => p.isInsured);
    }

    // 4. ordenamiento
    switch (sortBy) {
      case 'tracking-asc':
        result.sort((a, b) => a.trackingNumber.localeCompare(b.trackingNumber));
        break;
      case 'tracking-desc':
        result.sort((a, b) => b.trackingNumber.localeCompare(a.trackingNumber));
        break;
      case 'weight-asc':
        result.sort((a, b) => a.weightKg - b.weightKg);
        break;
      case 'weight-desc':
        result.sort((a, b) => b.weightKg - a.weightKg);
        break;
      case 'date-asc':
        result.sort((a, b) =>
          new Date(a.shippedAt).getTime() - new Date(b.shippedAt).getTime()
        );
        break;
      case 'date-desc':
        result.sort((a, b) =>
          new Date(b.shippedAt).getTime() - new Date(a.shippedAt).getTime()
        );
        break;
    }

    return result;
  }, [items, debouncedSearchTerm, selectedStatus, showOnlyInsured, sortBy]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleDelete = (id: number): void => {
    if (window.confirm('¿Estás seguro de eliminar este paquete?')) {
      setItems((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleView = (id: number): void => {
    const pkg = items.find((i) => i.id === id);
    if (pkg) {
      alert(`Detalles de envío: ${pkg.trackingNumber}\nEstado: ${pkg.status}`);
    }
  };

  const clearFilters = (): void => {
    setSearchTerm('');
    setSelectedStatus('all');
    setShowOnlyInsured(false);
    setSortBy('tracking-asc');
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="catalog">
      <header className="catalog-header">
        <h1>📦 Catálogo de Paquetes</h1>
      </header>

      {/* Barra de búsqueda */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por tracking, origen o destino..."
      />

      {/* Filtros y ordenamiento */}
      <div className="controls">
        <FilterPanel
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          showOnlyInsured={showOnlyInsured}
          onInsuredChange={setShowOnlyInsured}
          onClearFilters={clearFilters}
        />

        <SortSelector
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {/* Contador de resultados */}
      <p className="results-count">
        Mostrando {processedItems.length} de {items.length} paquetes
        {debouncedSearchTerm && ` para "${debouncedSearchTerm}"`}
      </p>

      {/* Lista de elementos */}
      <ItemList
        items={processedItems}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
        onView={handleView}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default Catalog;

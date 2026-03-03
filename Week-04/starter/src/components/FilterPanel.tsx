// ============================================
// COMPONENTE: FilterPanel
// ============================================
import React from 'react';
import { PackageStatus } from '../types';
import { categories } from '../data/items';

interface FilterPanelProps {
  selectedStatus: PackageStatus;
  onStatusChange: (status: PackageStatus) => void;
  showOnlyInsured: boolean;
  onInsuredChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedStatus,
  onStatusChange,
  showOnlyInsured,
  onInsuredChange,
  onClearFilters,
}) => {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label htmlFor="status">Estado:</label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value as PackageStatus)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={showOnlyInsured}
            onChange={(e) => onInsuredChange(e.target.checked)}
          />
          Sólo asegurados
        </label>
      </div>

      <button onClick={onClearFilters} className="btn-clear">
        🔄 Limpiar filtros
      </button>
    </div>
  );
};
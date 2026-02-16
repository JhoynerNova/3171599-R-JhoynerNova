import { Package } from '../types';
import PackageCard from './PackageCard';

/**
 * PROPS: PackageList
 */
interface PackageListProps {
  packages: Package[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: PackageList
 *
 * Renderiza la lista de paquetes usando .map()
 */
const PackageList: React.FC<PackageListProps> = ({ packages, onDelete, onEdit }) => {
  // Manejar estado vacío
  if (packages.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No hay paquetes para mostrar</p>
        <p className="empty-state__hint">
          Agrega tu primer paquete usando el formulario de arriba
        </p>
      </div>
    );
  }

  // ============================================
  // RENDER: LISTA DE PAQUETES
  // ============================================
  return (
    <div className="package-list">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          pkg={pkg}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default PackageList;
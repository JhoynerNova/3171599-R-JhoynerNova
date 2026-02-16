import { Package } from '../types';

/**
 * PROPS: PackageCard
 */
interface PackageCardProps {
  pkg: Package;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: PackageCard
 *
 * Tarjeta individual para mostrar un paquete.
 * Adaptado al dominio de logística y transporte.
 */
const PackageCard: React.FC<PackageCardProps> = ({ pkg, onDelete, onEdit }) => {
  // ============================================
  // HANDLER: CONFIRMAR ELIMINACIÓN
  // ============================================
  const handleDelete = () => {
    if (window.confirm(`¿Eliminar paquete con tracking #${pkg.trackingNumber}?`)) {
      onDelete(pkg.id);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="package-card">
      {/* Información principal */}
      <div className="package-card__header">
        <h3 className="package-card__title">📦 {pkg.trackingNumber}</h3>

        {/* Badge de estado */}
        <span
          className={`badge badge--${
            pkg.status === 'entregado'
              ? 'success'
              : pkg.status === 'en tránsito'
              ? 'info'
              : 'warning'
          }`}
        >
          {pkg.status}
        </span>
      </div>

      {/* Información detallada */}
      <div className="package-card__body">
        <p><strong>Remitente:</strong> {pkg.sender}</p>
        <p><strong>Destinatario:</strong> {pkg.recipient}</p>
        <p><strong>Peso:</strong> {pkg.weight} kg</p>
      </div>

      {/* Acciones */}
      <div className="package-card__actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(pkg.id)}
          aria-label={`Editar paquete ${pkg.trackingNumber}`}
        >
          Editar
        </button>

        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Eliminar paquete ${pkg.trackingNumber}`}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
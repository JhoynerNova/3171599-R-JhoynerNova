// ============================================
// COMPONENTE: ItemCard
// ============================================
// Muestra una tarjeta con la información de un elemento
// TODO: Adaptar a tu dominio

import React from 'react';
import { Package } from '../types';

interface ItemCardProps {
  item: Package;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

/**
 * Tarjeta de elemento del catálogo
 * TODO: Personalizar según tu dominio
 */
export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onDelete,
  onView,
}) => {
  // mostrar información relevante de un paquete

  return (
    <div className="item-card">
      <h3>{item.trackingNumber}</h3>
      <p>
        <strong>Origen:</strong> {item.origin}
      </p>
      <p>
        <strong>Destino:</strong> {item.destination}
      </p>
      <p>
        <strong>Peso:</strong> {item.weightKg.toFixed(1)} kg
      </p>
      <p>
        <strong>Estado:</strong>{' '}
        <span className={`status ${item.status}`}>{item.status}</span>
      </p>
      <p>
        <strong>Asegurado:</strong>{' '}
        {item.isInsured ? '✅ Sí' : '❌ No'}
      </p>

      <div className="actions">
        {onView && (
          <button onClick={() => onView(item.id)}>Ver detalles</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(item.id)}>Eliminar</button>
        )}
      </div>
    </div>
  );
};

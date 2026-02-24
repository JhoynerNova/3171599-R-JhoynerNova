import { useState, useEffect } from 'react';
import { Package } from '../types';

/**
 * PROPS: PackageForm
 */
interface PackageFormProps {
  onAdd: (pkg: Omit<Package, 'id'>) => void;
  onUpdate: (id: number, updates: Partial<Package>) => void;
  editingPackage?: Package;
  onCancelEdit: () => void;
}

/**
 * COMPONENTE: PackageForm
 *
 * Formulario para agregar o editar paquetes.
 * Se adapta automáticamente según si hay un paquete siendo editado.
 */
const PackageForm: React.FC<PackageFormProps> = ({
  onAdd,
  onUpdate,
  editingPackage,
  onCancelEdit,
}) => {
  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================
  const initialState: Omit<Package, 'id'> = {
    trackingNumber: '',
    sender: '',
    recipient: '',
    status: 'pendiente',
    weight: 0,
  };

  const [formData, setFormData] = useState<Omit<Package, 'id'>>(initialState);

  // ============================================
  // EFECTO: PRE-LLENAR FORMULARIO AL EDITAR
  // ============================================
  useEffect(() => {
    if (editingPackage) {
      const { id, ...rest } = editingPackage;
      setFormData(rest);
    } else {
      setFormData(initialState);
    }
  }, [editingPackage]);

  // ============================================
  // HANDLERS
  // ============================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'weight' ? Number(value) : value });
  };

  const validate = (): boolean => {
    if (!formData.trackingNumber.trim()) {
      alert('El número de seguimiento es requerido');
      return false;
    }
    if (!formData.sender.trim()) {
      alert('El remitente es requerido');
      return false;
    }
    if (!formData.recipient.trim()) {
      alert('El destinatario es requerido');
      return false;
    }
    if (formData.weight <= 0) {
      alert('El peso debe ser mayor a 0');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingPackage) {
      onUpdate(editingPackage.id, formData);
      onCancelEdit();
    } else {
      onAdd(formData);
    }

    setFormData(initialState);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="form-container">
      <h2>{editingPackage ? '✏️ Editar Paquete' : '➕ Agregar Paquete'}</h2>

      <form onSubmit={handleSubmit} className="package-form">
        {/* Número de seguimiento */}
        <div className="form-group">
          <label htmlFor="trackingNumber">Número de Seguimiento *</label>
          <input
            type="text"
            id="trackingNumber"
            name="trackingNumber"
            value={formData.trackingNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Remitente */}
        <div className="form-group">
          <label htmlFor="sender">Remitente *</label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            required
          />
        </div>

        {/* Destinatario */}
        <div className="form-group">
          <label htmlFor="recipient">Destinatario *</label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
          />
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="status">Estado *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en tránsito">En tránsito</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>

        {/* Peso */}
        <div className="form-group">
          <label htmlFor="weight">Peso (kg) *</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min={0.1}
            step={0.1}
            required
          />
        </div>

        {/* Botones */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingPackage ? 'Actualizar' : 'Agregar'}
          </button>

          {editingPackage && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onCancelEdit();
                setFormData(initialState);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
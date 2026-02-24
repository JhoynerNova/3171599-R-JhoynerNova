import React, { useState, useEffect } from 'react';
import type { Item } from '../types';
import { fetchItems } from '../utils/api';

// ============================================
// COMPONENTE: ItemList
// Muestra la lista principal de elementos del dominio
// ============================================

// NOTA PARA EL APRENDIZ:
// Este componente debe:
// 1. Cargar datos al montar usando useEffect
// 2. Manejar estados: loading, error, data
// 3. Usar AbortController para cancelación
// 4. Mostrar los items en una lista
// 5. Renderizado condicional según el estado

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Búsqueda simple (opcional)
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();

    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchItems(controller.signal);
        setItems(data);
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    loadItems();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="item-list">
        <h2>Cargando elementos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-list error">
        <h2>Error al cargar datos</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  // TODO: 5. Renderizado principal: lista de items
  return (
    <div className="item-list">
      <h2>Lista de Elementos</h2>
      {/* TODO: Cambiar título según tu dominio */}
      {/* Ejemplos: "Lista de Libros", "Inventario", "Miembros", "Menú" */}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="item-count">Total: {items.length} paquetes</p>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por tracking, origen, destino..."
              style={{ padding: 6, borderRadius: 6 }}
            />
          </div>

          <ul className="items">
            {items
              .filter((it) => {
                if (!query.trim()) return true;
                const text = (it.trackingNumber + ' ' + (it.description || '') + ' ' + it.origin + ' ' + it.destination).toLowerCase();
                return text.includes(query.toLowerCase());
              })
              .map((item) => (
                <li key={item.id} className="item-card" style={{ border: '1px solid #eee' }}>
                  <h3>{item.trackingNumber} — {item.status}</h3>
                  <p style={{ margin: '6px 0' }}>{item.description}</p>
                  <p style={{ margin: '4px 0', fontSize: 12, color: '#555' }}>
                    {item.origin} ➜ {item.destination}
                  </p>
                  <p style={{ margin: '4px 0', fontSize: 12, color: '#777' }}>
                    Última ubicación: {item.lastLocation || 'Desconocida'} • {new Date(item.lastUpdated).toLocaleString()}
                  </p>
                </li>
              ))}
          </ul>

      {/* TODO: (Opcional) Agregar búsqueda/filtrado */}
      {/* <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleSearch(e.target.value)}
      /> */}
    </div>
  );
};

// ============================================
// ESTILOS SUGERIDOS (CSS inline o archivo separado)
// ============================================

// .item-list {
//   padding: 20px;
//   background: #f5f5f5;
//   border-radius: 8px;
// }
//
// .items {
//   list-style: none;
//   padding: 0;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 16px;
// }
//
// .item-card {
//   background: white;
//   padding: 16px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// }
//
// .error {
//   background: #fee;
//   border: 1px solid #fcc;
// }

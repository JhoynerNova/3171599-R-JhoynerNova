import React, { useState, useEffect } from 'react';
import type { Stats } from '../types';
import { fetchStats } from '../utils/api';

// ============================================
// COMPONENTE: StatsCard
// Muestra estadísticas clave del dominio
// ============================================

// NOTA PARA EL APRENDIZ:
// Este componente debe:
// 1. Tener múltiples useEffect para diferentes stats
// 2. Cada stat se carga de forma independiente
// 3. Manejar loading de cada stat individualmente
// 4. Mostrar las métricas de forma clara y visual

export const StatsCard: React.FC = () => {
  const [totalParcels, setTotalParcels] = useState<number>(0);
  const [inTransit, setInTransit] = useState<number>(0);
  const [deliveredPercentage, setDeliveredPercentage] = useState<number>(0);
  const [loadingTotal, setLoadingTotal] = useState<boolean>(true);
  const [loadingInTransit, setLoadingInTransit] = useState<boolean>(true);
  const [loadingPercentage, setLoadingPercentage] = useState<boolean>(true);

  // Efecto 1: total de paquetes
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingTotal(true);
        const data = await fetchStats();
        if (!mounted) return;
        setTotalParcels(data.totalParcels);
      } catch (err) {
        console.error('Error loading total parcels', err);
      } finally {
        setLoadingTotal(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Efecto 2: in transit
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingInTransit(true);
        const data = await fetchStats();
        if (!mounted) return;
        setInTransit(data.inTransit);
      } catch (err) {
        console.error('Error loading inTransit', err);
      } finally {
        setLoadingInTransit(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Efecto 3: porcentaje entregado
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingPercentage(true);
        const data = await fetchStats();
        if (!mounted) return;
        setDeliveredPercentage(data.deliveredPercentage);
      } catch (err) {
        console.error('Error loading deliveredPercentage', err);
      } finally {
        setLoadingPercentage(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // TODO: 3. (Avanzado) Implementar múltiples efectos independientes
  // Si tienes 3 stats diferentes, cada uno puede tener su propio useEffect:
  //
  // useEffect(() => {
  //   const loadTotalItems = async () => {
  //     // Fetch stat 1
  //   };
  //   loadTotalItems();
  // }, []);
  //
  // useEffect(() => {
  //   const loadActiveItems = async () => {
  //     // Fetch stat 2
  //   };
  //   loadActiveItems();
  // }, []);
  //
  // useEffect(() => {
  //   const loadPercentage = async () => {
  //     // Fetch stat 3
  //   };
  //   loadPercentage();
  // }, []);

  const loading = loadingTotal || loadingInTransit || loadingPercentage;
  if (loading) {
    return (
      <div className="stats-card">
        <h2>Cargando estadísticas...</h2>
      </div>
    );
  }

  // TODO: 5. Renderizado principal: mostrar stats
  return (
    <div className="stats-card">
      <h2>Estadísticas</h2>
      {/* TODO: Cambiar título según tu dominio */}

      <div className="stats-grid">
        {/* TODO: Stat 1 - Total de elementos */}
        <div className="stat">
          <div className="stat-value">{totalParcels}</div>
          <div className="stat-label">Total de Paquetes</div>
        </div>

        {/* TODO: Stat 2 - Elementos activos/disponibles */}
        <div className="stat">
          <div className="stat-value">{inTransit}</div>
          <div className="stat-label">En tránsito</div>
        </div>

        {/* TODO: Stat 3 - Porcentaje o métrica calculada */}
        <div className="stat">
          <div className="stat-value">{deliveredPercentage}%</div>
          <div className="stat-label">Entregados</div>
        </div>

        {/* TODO: (Opcional) Agregar más stats específicos de tu dominio */}
        {/* Ejemplos adicionales:
        - Biblioteca: "Préstamos Hoy", "Salas Disponibles"
        - Farmacia: "Ventas del Día", "Stock Bajo"
        - Gimnasio: "Asistencias Hoy", "Clases Activas"
        - Restaurante: "Pedidos Activos", "Promedio de Calificación"
        */}
      </div>
    </div>
  );
};

// ============================================
// ESTILOS SUGERIDOS
// ============================================

// .stats-card {
//   padding: 20px;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// }
//
// .stats-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//   gap: 16px;
//   margin-top: 16px;
// }
//
// .stat {
//   text-align: center;
//   padding: 16px;
//   background: #f8f9fa;
//   border-radius: 8px;
// }
//
// .stat-value {
//   font-size: 2.5rem;
//   font-weight: bold;
//   color: #2c3e50;
// }
//
// .stat-label {
//   font-size: 0.9rem;
//   color: #7f8c8d;
//   margin-top: 8px;
//   text-transform: uppercase;
// }

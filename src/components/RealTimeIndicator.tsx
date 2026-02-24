import React, { useState, useEffect } from 'react';
import type { RealTimeData } from '../types';
import { fetchRealTimeData } from '../utils/api';

// ============================================
// COMPONENTE: RealTimeIndicator
// Muestra datos que se actualizan automáticamente mediante polling
// ============================================

// NOTA PARA EL APRENDIZ:
// Este componente debe:
// 1. Usar setInterval para polling periódico
// 2. Actualizar datos cada 5-10 segundos
// 3. Mostrar timestamp de última actualización
// 4. Limpiar interval en cleanup
// 5. Indicador visual de actualización activa

// TODO: Configura el intervalo de actualización (milisegundos)
const POLLING_INTERVAL = 5000; // 5 segundos

export const RealTimeIndicator: React.FC = () => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setIsUpdating(true);
        const newData = await fetchRealTimeData();
        if (!mounted) return;
        setData(newData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading real-time data:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    loadData(); // llamada inicial

    const intervalId = setInterval(() => {
      loadData();
    }, POLLING_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const formatTimestamp = (isoString: string): string => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString();
    } catch {
      return isoString;
    }
  };

  if (loading) {
    return (
      <div className="realtime-indicator">
        <h2>Cargando datos en tiempo real...</h2>
      </div>
    );
  }

  if (!data) return null;

  // TODO: 5. Renderizado principal
  return (
    <div className="realtime-indicator">
      <div className="realtime-header">
        <h2>Datos en Tiempo Real</h2>
        {/* TODO: Cambiar título según tu dominio */}
        {/* Ejemplos:
          - "Ocupación Actual" (biblioteca/gimnasio)
          - "Pedidos Pendientes" (farmacia/restaurante)
          - "Mesas Disponibles" (restaurante)
        */}

        {/* TODO: Indicador de actualización activa */}
        {/* {isUpdating && (
          <span className="updating-badge">Actualizando...</span>
        )} */}
      </div>

      <div className="realtime-content">
        <div className="realtime-value" style={{ fontSize: 28, fontWeight: '700' }}>
          {data.value} {data.unit}
        </div>

        <div className="realtime-label" style={{ opacity: 0.9 }}>{data.label}</div>

        <div className="realtime-timestamp" style={{ marginTop: 8 }}>
          Última actualización: {formatTimestamp(data.lastUpdated)}
        </div>

        <div className="next-update" style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
          Próxima actualización en {POLLING_INTERVAL / 1000} segundos
        </div>
      </div>

      {/* TODO: (Opcional) Barra de progreso hasta próxima actualización */}
      {/* <div className="progress-bar">
        <div className="progress-fill" style={{ animation: `progress ${POLLING_INTERVAL}ms linear infinite` }}></div>
      </div> */}
    </div>
  );
};

// ============================================
// ESTILOS SUGERIDOS
// ============================================

// .realtime-indicator {
//   padding: 20px;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   color: white;
//   border-radius: 8px;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.15);
// }
//
// .realtime-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 16px;
// }
//
// .realtime-header h2 {
//   margin: 0;
//   font-size: 1.2rem;
// }
//
// .updating-badge {
//   background: rgba(255,255,255,0.3);
//   padding: 4px 12px;
//   border-radius: 12px;
//   font-size: 0.8rem;
//   animation: pulse 1s infinite;
// }
//
// .realtime-content {
//   text-align: center;
// }
//
// .realtime-value {
//   font-size: 3rem;
//   font-weight: bold;
//   margin: 16px 0;
// }
//
// .realtime-label {
//   font-size: 1.1rem;
//   opacity: 0.9;
// }
//
// .realtime-timestamp {
//   font-size: 0.85rem;
//   opacity: 0.7;
//   margin-top: 12px;
// }
//
// .next-update {
//   font-size: 0.8rem;
//   opacity: 0.6;
//   margin-top: 8px;
// }
//
// .progress-bar {
//   margin-top: 16px;
//   height: 4px;
//   background: rgba(255,255,255,0.2);
//   border-radius: 2px;
//   overflow: hidden;
// }
//
// .progress-fill {
//   height: 100%;
//   background: white;
//   width: 100%;
//   transform-origin: left;
// }
//
// @keyframes pulse {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.5; }
// }
//
// @keyframes progress {
//   from { transform: scaleX(1); }
//   to { transform: scaleX(0); }
// }

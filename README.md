# Dashboard - Semana 03

Dominio: **Sistema de seguimiento de paquetes**

Breve: Implementación de un dashboard que demuestra el uso de `useEffect` para fetch inicial, polling en tiempo real, múltiples efectos independientes y manejo de estados (loading/error). Los datos son mock locales adaptados al dominio de paquetes.

**Cómo ejecutar**

- Abrir terminal en `Week-03/starter`.
- Instalar dependencias:

```
pnpm install
```

- Levantar servidor de desarrollo:

```
pnpm dev
```

El servidor suele abrir en `http://localhost:5173` o el puerto que Vite asigne.

**Qué implementé (resumen)**

- Tipos en `src/types/index.ts` adaptados al dominio (`Item`, `Stats`, `RealTimeData`).
- APIs mock en `src/utils/api.ts`:
  - `fetchItems(signal?)` — soporta `AbortSignal` y simula latencia.
  - `fetchStats()` — calcula métricas básicas (total, inTransit, deliveredPercentage).
  - `fetchRealTimeData()` — retorna valor en tiempo real (paquetes en tránsito) con ligera variación.
  - `searchItems(query)` — búsqueda local simple.
- Componentes en `src/components`:
  - `ItemList` — fetch inicial con `AbortController`, estados `loading`/`error`, búsqueda local y listado.
  - `StatsCard` — tres efectos independientes para cargar métricas.
  - `RealTimeIndicator` — polling con `setInterval`, cleanup y timestamp de última actualización.
  - `Dashboard` — ensambla los componentes y layout básico.
- Entrypoints y config:
  - `index.html`, `src/main.tsx`, `vite.config.ts`, `src/styles.css`.

**Criterios del profesor — cobertura**

- Fetch inicial con `AbortController`: implementado en `ItemList` + `fetchItems` soporta cancelación.
- Polling y cleanup: implementado en `RealTimeIndicator` (interval con `clearInterval`).
- Múltiples `useEffect` independientes: implementado en `StatsCard` (tres efectos separados).
- Estados `loading` / `error` manejados: presentes en `ItemList`, `StatsCard` y `RealTimeIndicator`.
- Tipos TypeScript: definidos en `src/types/index.ts`.

Opcional no implementado: hook `useFetch` genérico (puedo extraer la lógica si quieres).

**Pruebas sugeridas (manualmente)**

1. Abrir `http://localhost:5173` (o puerto indicado por Vite) y verificar que el dashboard carga.
2. Ver que `ItemList` muestra items mock y que el campo de búsqueda filtra resultados.
3. Observar `StatsCard` con métricas y `RealTimeIndicator` actualizándose cada 5s.
4. Revisar consola del navegador/terminal por errores.

**Archivos clave**

- [src/types/index.ts](src/types/index.ts)
- [src/utils/api.ts](src/utils/api.ts)
- [src/components/ItemList.tsx](src/components/ItemList.tsx)
- [src/components/StatsCard.tsx](src/components/StatsCard.tsx)
- [src/components/RealTimeIndicator.tsx](src/components/RealTimeIndicator.tsx)
- [src/components/Dashboard.tsx](src/components/Dashboard.tsx)

---
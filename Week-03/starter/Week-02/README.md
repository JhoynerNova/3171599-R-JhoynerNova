
# 📦 Sistema de Seguimiento de Paquetes

Proyecto CRUD desarrollado en **React + TypeScript** como parte del bootcamp.  
El dominio asignado es **Logística y Transporte**, enfocado en la gestión y seguimiento de paquetes.

---

## 🎯 Objetivos del Proyecto

- Construir una aplicación completa con operaciones **CRUD** (Create, Read, Update, Delete).
- Practicar conceptos clave de React:
  - Componentes funcionales con TypeScript
  - Props tipados con interfaces
  - Estado local con `useState`
  - Renderizado de listas con `.map()`
  - Manejo de eventos (`onClick`, `onChange`, `onSubmit`)
  - Formularios controlados
  - Renderizado condicional
  - Composición de componentes
  - Inmutabilidad en operaciones de estado

---

## 📚 Funcionalidades

- **Visualizar lista de paquetes** con sus propiedades principales:
  - Número de seguimiento
  - Remitente
  - Destinatario
  - Estado (`pendiente`, `en tránsito`, `entregado`)
  - Peso en kg
- **Agregar nuevos paquetes** mediante formulario controlado.
- **Editar paquetes existentes** con pre-llenado de datos.
- **Eliminar paquetes** con confirmación.
- **Indicadores visuales** de estado mediante badges.

---

##Estructura de Componentes

```
App (componente principal con estado)
├── Header (título y descripción del sistema)
├── PackageForm (formulario agregar/editar)
├── PackageList (lista de paquetes)
│   └── PackageCard × N (tarjeta individual)
```

---

##Requisitos Técnicos

- **TypeScript**: interfaces para la entidad `Package`.
- **React**: componentes funcionales con props tipadas.
- **Inmutabilidad**: uso de `map()`, `filter()`, `spread operator`.
- **Validación**: campos requeridos y valores válidos (peso > 0).
- **UI/UX**: mensajes de estado vacío, botones con acciones claras.

---

##Instalación y Ejecución

1. Instalar dependencias:

```bash
cd 3171599-R-JhoynerNova/Week-02
pnpm install
```

2. Ejecutar en desarrollo:

```bash
pnpm dev
```

3. Build para producción:

```bash
pnpm build
```

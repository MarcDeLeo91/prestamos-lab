# Gestor de Préstamos de Equipo

Aplicación web hecha con React y TypeScript para administrar el préstamo de equipo (monitores, teclados y mouses): inventario, registro de préstamos con validación, devoluciones y detección de préstamos vencidos.

## Tecnologías

- React + TypeScript (Vite)
- json-server como API REST simulada
- Hooks: useState, useEffect y hooks personalizados

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/MarcDeLeo91/prestamos-lab.git
   cd prestamos-lab
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz con:

   ```
   VITE_API_URL=http://localhost:3001
   ```

4. En una terminal, levantar la API:

   ```bash
   npm run api
   ```

5. En otra terminal, levantar la aplicación:

   ```bash
   npm run dev
   ```

6. Abrir http://localhost:5173

## Funcionalidades

- Inventario con filtro por categoría y búsqueda por nombre (combinados)
- Contadores derivados en el encabezado (disponibles, prestados, vencidos)
- Formulario controlado con validación (solicitante, carné 0000-00-00000, fecha límite de máximo 5 días)
- Registro de préstamos y devoluciones con persistencia en la API
- Estados de carga, error y botón Reintentar

## Estructura del proyecto

```
src/
├── components/   componentes reutilizables
├── pages/        vistas (Inventario, PrestamosActivos)
├── hooks/        useEquipos, usePrestamos
├── services/     api.ts (peticiones a la API)
├── utils/        funciones de fechas
└── types.ts      tipos compartidos
```

## Autor

Marco De León
````md
# UNERP Frontend

Frontend del sistema **UNERP**, desarrollado con **React**, **TypeScript** y **Vite**.

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto con la URL del backend.

Ejemplo:

```env
VITE_API_URL=http://localhost:8080
```

## Ejecutar en desarrollo

```bash
npm run dev
```

El proyecto estará disponible en:

```
http://localhost:5173
```

## Compilar para producción

```bash
npm run build
```

## Vista previa de producción

```bash
npm run preview
```

## Estructura del proyecto

```
src/
├── modules/
│   ├── auth/
│   ├── dashboard/
│   ├── inventory/
│   ├── purchases/
│   ├── sales/
│   └── user/
├── router/
├── services/
├── shared/
└── styles/
```

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- Lucide React
````

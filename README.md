# UNERP Frontend

<p align="center">
  <img src="./public/logo.png" width="160"/>
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

</p>

Frontend del sistema **UNERP**, desarrollado para la asignatura **Ingeniería de Software I** de la Universidad Nacional de Colombia.

El proyecto implementa una arquitectura modular basada en React y TypeScript para la administración de los diferentes módulos del ERP.

---

# Características

- Inicio de sesión
- Dashboard
- Gestión de usuarios
- Gestión de productos
- Gestión de proveedores
- Gestión de clientes
- Gestión de compras
- Componentes reutilizables
- Control de permisos
- Arquitectura modular

---

# Tecnologías

| Tecnología | Versión |
|------------|---------|
| React | 19 |
| TypeScript | 5 |
| Vite | 7 |
| React Router | 7 |
| Lucide React | Latest |

---

# Arquitectura

El proyecto sigue una arquitectura modular basada en funcionalidades.

```

src/
│
├── modules/
│ ├── authentication/
│ ├── dashboard/
│ ├── inventory/
│ ├── purchases/
│ ├── sales/
│ └── users/
│
├── shared/
│ ├── components/
│ ├── hooks/
│ ├── layouts/
│ ├── services/
│ └── utils/
│
└── routes/

```

Cada módulo contiene sus propias:

- páginas
- componentes
- servicios
- tipos
- estilos

permitiendo un bajo acoplamiento entre funcionalidades.

---

# Componentes reutilizables

El proyecto cuenta con una librería de componentes reutilizables.

- Alert
- Button
- Card
- EmptyState
- Input
- Navbar
- Select
- Sidebar
- Spinner
- Table

---

# Instalación

## Clonar

```bash
git clone https://github.com/usuario/project-frontend.git
```

Entrar al proyecto

```bash
cd project-frontend
```

Instalar dependencias

```bash
npm install
```

Ejecutar

```bash
npm run dev
```

Compilar

```bash
npm run build
```

Vista previa

```bash
npm run preview
```

---

# Variables de entorno

Crear un archivo

```
.env
```

Ejemplo

```env
VITE_API_URL=http://localhost:8080
```

---

# Scripts

| Script | Descripción |
|---------|-------------|
| npm run dev | Ejecuta el proyecto |
| npm run build | Compila producción |
| npm run preview | Vista previa |
| npm run lint | Ejecuta ESLint |

---

# Módulos implementados

## Usuarios

- CRUD
- Roles
- Permisos

## Inventario

- CRUD Productos

## Compras

- CRUD Compras
- CRUD Proveedores

## Ventas

- CRUD Clientes

---

# Diseño

El proyecto utiliza una guía de estilos propia basada en:

- Cards
- Inputs consistentes
- Tablas reutilizables
- Sidebar jerárquico
- Navbar responsive
- Componentes desacoplados

---

# Autores

Proyecto desarrollado por el equipo **sudo** para Ingeniería de Software I.

Universidad Nacional de Colombia.
export const UserRole = {
    ADMIN_EMPRESA: "ADMIN_EMPRESA",
    EMPLEADO_VENTAS: "EMPLEADO_VENTAS",
    EMPLEADO_COMPRAS: "EMPLEADO_COMPRAS",
    EMPLEADO_INVENTARIO: "EMPLEADO_INVENTARIO",
    EMPLEADO_VENTAS_COMPRAS: "EMPLEADO_VENTAS_COMPRAS",
    EMPLEADO_VENTAS_INVENTARIO: "EMPLEADO_VENTAS_INVENTARIO",
    EMPLEADO_COMPRAS_INVENTARIO: "EMPLEADO_COMPRAS_INVENTARIO",
    EMPLEADO_TOTAL: "EMPLEADO_TOTAL",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const roleLabels: Record<UserRole, string> = {
    ADMIN_EMPRESA: "Administrador de Empresa",
    EMPLEADO_VENTAS: "Empleado de Ventas",
    EMPLEADO_COMPRAS: "Empleado de Compras",
    EMPLEADO_INVENTARIO: "Empleado de Inventario",
    EMPLEADO_VENTAS_COMPRAS: "Empleado de Ventas y Compras",
    EMPLEADO_VENTAS_INVENTARIO: "Empleado de Ventas e Inventario",
    EMPLEADO_COMPRAS_INVENTARIO: "Empleado de Compras e Inventario",
    EMPLEADO_TOTAL: "Acceso Total a Empleado",
};
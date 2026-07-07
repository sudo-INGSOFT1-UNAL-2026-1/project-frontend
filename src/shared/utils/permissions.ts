import { UserRole } from "../../modules/user/types/UserRole";


export type Permission = keyof (typeof permissions)[keyof typeof permissions];

export const permissions = {
    [UserRole.ADMIN_EMPRESA]:{
        canAccessUsers: true,
        canAccessInventory: true,
        canAccessPurchases: true,
        canAccessSales: true,
    },

    [UserRole.EMPLEADO_VENTAS]:{
        canAccessUsers: false,
        canAccessInventory: false,
        canAccessPurchases: false,
        canAccessSales: true,
    },

    [UserRole.EMPLEADO_INVENTARIO]:{
        canAccessUsers: false,
        canAccessInventory: true,
        canAccessPurchases: false,
        canAccessSales: false,
    },

    [UserRole.EMPLEADO_COMPRAS]:{
        canAccessUsers: false,
        canAccessInventory: false,
        canAccessPurchases: true,
        canAccessSales: false,
    },

    [UserRole.EMPLEADO_COMPRAS_INVENTARIO]:{
        canAccessUsers: false,
        canAccessInventory: true,
        canAccessPurchases: true,
        canAccessSales: false,
    },

    [UserRole.EMPLEADO_VENTAS_INVENTARIO]:{
        canAccessUsers: false,
        canAccessInventory: true,
        canAccessPurchases: false,
        canAccessSales: true,
    },

    [UserRole.EMPLEADO_VENTAS_COMPRAS]:{
        canAccessUsers: false,
        canAccessInventory: false,
        canAccessPurchases: true,
        canAccessSales: true,
    },

    [UserRole.EMPLEADO_TOTAL]:{
        canAccessUsers: false,
        canAccessInventory: true,
        canAccessPurchases: true,
        canAccessSales: true,
    },
} as const;
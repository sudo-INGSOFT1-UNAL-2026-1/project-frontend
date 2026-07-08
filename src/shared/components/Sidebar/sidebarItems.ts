import {
    Boxes,
    LayoutDashboard,
    PackagePlus,
    ReceiptText,
    ShoppingCart,
    Truck,
    User,
    UserPlus,
    Users,
} from "lucide-react";

import type { SidebarItem } from "./types";

export const sidebarItems: SidebarItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        id: "users",
        label: "Usuarios",
        icon: Users,
        permission: "canAccessUsers",
        children: [
            {
                id: "users-list",
                label: "Lista de usuarios",
                path: "/users",
                icon: Users,
            },
            {
                id: "users-create",
                label: "Nuevo usuario",
                path: "/users/create",
                icon: UserPlus,
            },
        ],
    },

    {
        id: "inventory",
        label: "Inventario",
        icon: Boxes,
        permission: "canAccessInventory",
        children: [
            {
                id: "products-list",
                label: "Productos",
                path: "/inventory/products",
                icon: Boxes,
            },
            {
                id: "products-create",
                label: "Nuevo producto",
                path: "/inventory/products/create",
                icon: PackagePlus,
            },
        ],
    },

    {
        id: "purchases",
        label: "Compras",
        icon: ShoppingCart,
        permission: "canAccessPurchases",
        children: [
            {
                id: "purchase-orders",
                label: "Órdenes de compra",
                icon: ShoppingCart,
                children: [
                    {
                        id: "purchase-list",
                        label: "Lista de compras",
                        path: "/purchases",
                        icon: ShoppingCart,
                    },
                    {
                        id: "purchase-create",
                        label: "Nueva compra",
                        path: "/purchases/create",
                        icon: PackagePlus,
                    },
                ],
            },
            {
                id: "suppliers",
                label: "Proveedores",
                icon: Truck,
                children: [
                    {
                        id: "suppliers-list",
                        label: "Lista de proveedores",
                        path: "/purchases/suppliers",
                        icon: Truck,
                    },
                    {
                        id: "suppliers-create",
                        label: "Nuevo proveedor",
                        path: "/purchases/suppliers/create",
                        icon: PackagePlus,
                    },
                ],
            },
        ],
    },

    {
        id: "sales",
        label: "Ventas",
        icon: ReceiptText,
        permission: "canAccessSales",
        children: [
            {
                id: "sales-list",
                label: "Ventas",
                path: "/sales",
                icon: ReceiptText,
            },
            {
                id: "customers",
                label: "Clientes",
                icon: User,
                children: [
                    {
                        id: "customers-list",
                        label: "Lista de clientes",
                        path: "/sales/customers",
                        icon: User,
                    },
                    {
                        id: "customers-create",
                        label: "Nuevo cliente",
                        path: "/sales/customers/create",
                        icon: UserPlus,
                    },
                ],
            },
        ],
    },
];


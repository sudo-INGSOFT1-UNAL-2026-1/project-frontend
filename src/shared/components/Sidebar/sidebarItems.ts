import { createElement } from "react";
import {
    Boxes,
    LayoutDashboard,
    PackagePlus,
    ReceiptText,
    ShoppingCart,
    Users,
    UserPlus,
} from "lucide-react";

import type { SidebarItem } from "./types";

export const sidebarItems: SidebarItem[] = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: createElement(LayoutDashboard, {
            size: 20,
        }),
    },

    {
        label: "Usuarios",
        icon: createElement(Users, {
            size: 20,
        }),
        permission: "canAccessUsers",

        children: [
            {
                label: "Lista de usuarios",
                path: "/users",
                icon: createElement(Users, {
                    size: 18,
                }),
            },

            {
                label: "Nuevo usuario",
                path: "/users/create",
                icon: createElement(UserPlus, {
                    size: 18,
                }),
            },
        ],
    },

    {
        label: "Inventario",
        icon: createElement(Boxes, {
            size: 20,
        }),
        permission: "canAccessInventory",

        children: [
            {
                label: "Productos",
                path: "/inventory",
                icon: createElement(Boxes, {
                    size: 18,
                }),
            },

            {
                label: "Nuevo producto",
                path: "/inventory/create",
                icon: createElement(PackagePlus, {
                    size: 18,
                }),
            },
        ],
    },

    {
        label: "Compras",
        icon: createElement(ShoppingCart, {
            size: 20,
        }),
        permission: "canAccessPurchases",

        children: [
            {
                label: "Órdenes",
                path: "/purchases",
                icon: createElement(ShoppingCart, {
                    size: 18,
                }),
            },
        ],
    },

    {
        label: "Ventas",
        icon: createElement(ReceiptText, {
            size: 20,
        }),
        permission: "canAccessSales",

        children: [
            {
                label: "Ventas",
                path: "/sales",
                icon: createElement(ReceiptText, {
                    size: 18,
                }),
            },
        ],
    },
];
import {
  Boxes,
  LayoutDashboard,
  PackagePlus,
  ReceiptText,
  ShoppingCart,
  UserPlus,
  Users
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
              id: "inventory-products",
              label: "Productos",
              path: "/inventory",
              icon: Boxes,
          },
          {
              id: "inventory-create",
              label: "Nuevo producto",
              path: "/inventory/create",
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
              id: "purchases-list",
              label: "Órdenes de compra",
              path: "/purchases",
              icon: ShoppingCart,
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
      ],
  },
];
import { createElement } from "react";
import {
  LayoutDashboard,
  Users,
  Boxes,
  ShoppingCart,
  ReceiptText,
} from "lucide-react";

import type { SidebarItem } from "./types";

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: createElement(LayoutDashboard, { size: 20 }),
  },
  {
    label: "Usuarios",
    path: "/users",
    icon: createElement(Users, { size: 20 }),
    permission: "canAccessUsers",
  },
  {
    label: "Inventario",
    path: "/inventory",
    icon: createElement(Boxes, { size: 20 }),
    permission: "canAccessInventory",
  },
  {
    label: "Compras",
    path: "/purchases",
    icon: createElement(ShoppingCart, { size: 20 }),
    permission: "canAccessPurchases",
  },
  {
    label: "Ventas",
    path: "/sales",
    icon: createElement(ReceiptText, { size: 20 }),
    permission: "canAccessSales",
  },
];
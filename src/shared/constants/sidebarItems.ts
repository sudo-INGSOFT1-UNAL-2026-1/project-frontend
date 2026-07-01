import type { Permission } from "../utils/permissions";

export interface SidebarItem {
    label: string;
    path: string;
    permission?: Permission;
}

export const sidebarItems: SidebarItem[] = [
    {
        label: "Dashboard",
        path: "/dashboard"
    },
    
    {
        label: "Users",
        path: "/users",
        permission: "canAccessUsers"
    },

    {
        label: "Inventory",
        path: "/inventory",
        permission: "canAccessInventory"
    },

    {
        label: "Purchases",
        path: "/purchases",
        permission: "canAccessPurchases"
    },

    {
        label: "Sales",
        path: "/sales",
        permission: "canAccessSales"
    },
]
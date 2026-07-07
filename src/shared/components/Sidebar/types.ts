import type { LucideIcon } from "lucide-react";

import type { Permission } from "../../utils/permissions";

export interface SidebarItem {

    id: string;

    label: string;

    path?: string;

    icon: LucideIcon;

    permission?: Permission;

    children?: SidebarItem[];
}
import type { ReactNode } from "react";

import type { Permission } from "../../utils/permissions";

export interface SidebarItem {

    label: string;

    icon: ReactNode;

    permission?: Permission;

    path?: string;

    children?: SidebarItem[];
}
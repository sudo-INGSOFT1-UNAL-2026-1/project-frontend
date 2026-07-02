import type { ReactNode } from "react";

import type { Permission } from "../../utils/permissions";

export interface SidebarItem {
    label: string;

    path: string;

    icon: ReactNode;

    permission?: Permission;
}
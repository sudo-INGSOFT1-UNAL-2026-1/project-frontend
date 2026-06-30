import { permissions, type Permission } from "./permissions";
import { getCurrentRole } from "./sessionManager";

export function canAccess(permission: Permission): boolean {

    const role = getCurrentRole();
    
    if (!role) {
        return false;
    }

    return permissions[role as keyof typeof permissions][permission];
}
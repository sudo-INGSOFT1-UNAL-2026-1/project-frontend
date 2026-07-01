import { permissions, type Permission } from "./permissions";
import { getCurrentRole } from "./sessionManager";

export function canAccess(permission: Permission): boolean {

    const role = getCurrentRole();
    
    if (!role) {
        return false;
    }

    return permissions[role][permission];
}

export function isAdmin(): boolean {
    return canAccess("canAccessUsers");
}
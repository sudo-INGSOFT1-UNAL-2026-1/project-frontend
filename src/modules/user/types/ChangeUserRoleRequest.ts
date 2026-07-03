import { UserRole } from "./UserRole";

export interface ChangeUserRoleRequest {
    userId: string;
    newRoleName: UserRole;
}
import { UserRole } from "./UserRole";

export interface ChangeUserRoleRequest {
    userId: Number;
    newRoleName: UserRole;
}
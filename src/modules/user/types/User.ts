import type { UserRole } from "./UserRole";

export interface User {
    id: number;
    name: string;
    email: string;
    roleName: UserRole;
    state: string;
}
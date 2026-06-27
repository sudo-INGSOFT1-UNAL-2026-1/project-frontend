import type { UserRole } from "../../user/types/UserRole";
import type { UserState } from "../../user/types/UserState";

export interface LoginResponse {
    token: string;
    id: number;
    name: string;
    email: string;
    state: UserState;
    role: UserRole;
}
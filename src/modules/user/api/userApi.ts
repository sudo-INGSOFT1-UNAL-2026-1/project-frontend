import { apiClient } from "../../../api/axios";
import type { CreateUserRequest } from "../types/CreateUserRequest";
import type { User } from "../types/User";
import type { ChangeUserRoleRequest } from "../types/ChangeUserRoleRequest";

export async function createUser(request: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>(`user/create`, request);

    return response.data;
}

export async function getAllUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>(`user/all`);

    return response.data;
}

export async function changeUserRole(request: ChangeUserRoleRequest): Promise<User> {

    const response = await apiClient.put<User>(`user/change-role`, null, {
        params: {
            userId: request.userId,
            newRoleName: request.newRoleName,
        },
    });
    return response.data;
}
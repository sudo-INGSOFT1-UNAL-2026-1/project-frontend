import { apiClient } from "../../../api/axios";
import type { CreateUserRequest } from "../types/CreateUserRequest";
import type { User } from "../types/User";
import type { ChangeUserRoleRequest } from "../types/ChangeUserRoleRequest";
import type { UserIdRequest } from "../types/UserIdRequest";

export async function createUser(request: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>(`user/create`, request);

    return response.data;
}

export async function getAllUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>(`user/all`);

    return response.data;
}

export async function changeUserRole(request: ChangeUserRoleRequest): Promise<User> {

    const response = await apiClient.put<User>(`user/change-role`, request);
    return response.data;
}

export async function getUserById(userId: number): Promise<User> {
    const response = await apiClient.get<User>(`user/${userId}`);
    return response.data;
}

export async function activateUser(request: UserIdRequest): Promise<User> {
    const response = await apiClient.put<User>(`user/activate`, request);
    
    return response.data;
}

export async function deactivateUser(request: UserIdRequest): Promise<User> {
    
    const response = await apiClient.put<User>(`user/deactivate`, request);

    return response.data;
    
}   
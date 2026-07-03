import { apiClient } from "../../../api/axios";
import type { CreateUserRequest } from "../types/CreateUserRequest";
import type { User } from "../types/User";

export async function createUser(request: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>(`user/create`, request);

    return response.data;
}
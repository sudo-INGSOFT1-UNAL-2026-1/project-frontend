import type { User } from '../types/User';
import type { CreateUserRequest } from '../types/CreateUserRequest';
import type { ChangeUserRoleRequest } from '../types/ChangeUserRoleRequest';

import * as userApi from '../api/userApi';

export async function createUser(request: CreateUserRequest): Promise<User> {

    return await userApi.createUser(request);
}

export async function getAllUsers(): Promise<User[]> {

    return await userApi.getAllUsers();
}

export async function changeUserRole(request: ChangeUserRoleRequest): Promise<User> {

    return await userApi.changeUserRole(request);
}
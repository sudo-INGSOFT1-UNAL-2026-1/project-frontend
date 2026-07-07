import type { User } from '../types/User';
import type { CreateUserRequest } from '../types/CreateUserRequest';
import type { ChangeUserRoleRequest } from '../types/ChangeUserRoleRequest';

import * as userApi from '../api/userApi';
import type { UserIdRequest } from '../types/UserIdRequest';

export async function createUser(request: CreateUserRequest): Promise<User> {

    return await userApi.createUser(request);
}

export async function getAllUsers(): Promise<User[]> {

    return await userApi.getAllUsers();
}

export async function changeUserRole(request: ChangeUserRoleRequest): Promise<User> {

    return await userApi.changeUserRole(request);
}

export async function getUserById(request: UserIdRequest): Promise<User> {
    return await userApi.getUserById(request.userId);
}

export async function activateUser(request: UserIdRequest): Promise<User> {
    return await userApi.activateUser(request);
}

export async function deactivateUser(request: UserIdRequest): Promise<User> {
    return await userApi.deactivateUser(request);
}
import type { User } from '../types/User';
import type { CreateUserRequest } from '../types/CreateUserRequest';

import * as userApi from '../api/userApi';

export async function createUser(request: CreateUserRequest): Promise<User> {

    return await userApi.createUser(request);
}
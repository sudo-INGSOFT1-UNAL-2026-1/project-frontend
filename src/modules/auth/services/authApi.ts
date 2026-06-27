import { apiClient } from "../../../api/axios";
import type { LoginRequest } from "../types/LoginRequest";
import type { LoginResponse } from "../types/LoginResponse";


export async function getInitializationStatus() {
    const response = await apiClient.get(`auth/is-initialized`);
    console.log("Respuesta de la API:", response.data);
    return response.data;
}

export async function login(request: LoginRequest): Promise<LoginResponse> {

    const response = await apiClient.post<LoginResponse>(`auth/login`, request);
    
    return response.data;
}


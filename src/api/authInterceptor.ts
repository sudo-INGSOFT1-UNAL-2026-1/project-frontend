import { apiClient } from "./axios"
import { getToken } from "../shared/utils/sessionManager";

apiClient.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
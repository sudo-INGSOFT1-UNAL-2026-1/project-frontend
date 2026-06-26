import { apiClient } from "../../../api/axios";


export async function getInitializationStatus() {
    const response = await apiClient.get(`auth/is-initialized`);
    console.log("Respuesta de la API:", response.data);
    return response.data;
}


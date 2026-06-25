import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export async function getInitializationStatus() {
    const response = await axios.get(`${API_URL}/is-initialized`);
    console.log("Respuesta de la API:", response.data);
    return response.data;
}
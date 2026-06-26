import axios from "axios";

const API_URL = "http://localhost:8080/";

export async function getInitializationStatus() {
    const response = await axios.get(`${API_URL}auth/is-initialized`);
    console.log("Respuesta de la API:", response.data);
    return response.data;
}

export async function createAdmin(name: string, email: string, password: string){
    const response = await axios.post(`${API_URL}user/create`, null, {
        params: {
            name,
            email,
            password,
            role: "ADMIN_EMPRESA",}
        }
    );
    console.log("Respuesta de la API al crear admin:", response.data);
    return response.data;
}
import { useState } from "react";
import { createAdmin } from "../services/authApi";

export default function SetupAdminPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateAdmin = async () => {
        try {
            const response = await createAdmin(name, email, password);
            console.log("Administrador creado:", response);
            alert("Administrador creado exitosamente");
        } catch (error) {
            console.error("Error al crear el administrador:", error);
            alert("Error al crear el administrador");
        }
    };
    return (
        <div>
            <h1>Crear Administrador</h1>
        
        <input 
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <input 
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input 
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleCreateAdmin}>
            Crear Administrador</button>
        </div>
    );
}
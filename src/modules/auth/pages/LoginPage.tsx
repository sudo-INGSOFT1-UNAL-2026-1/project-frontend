import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/authApi";
import { setSession } from "../../../shared/utils/sessionManager";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login({ email, password });

            setSession(response);

            navigate("/dashboard");

            console.log(response);
            alert("Bienvenido, " + response.name);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Credenciales incorrectas");
        }
    };
    
    return (
        <div>
            <h1>Login</h1>
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
            <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
    );
}
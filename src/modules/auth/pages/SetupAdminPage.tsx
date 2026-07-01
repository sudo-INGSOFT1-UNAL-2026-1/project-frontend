import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getInitializationStatus } from "../services/authApi";
import { createUser } from "../../user/services/userApi";

export default function SetupAdminPage() {

    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        async function checkInitialization() {

            try {

                const response = await getInitializationStatus();

                if (response.initialized) {
                    navigate("/login", {
                        replace: true,
                    });
                }

            } finally {

                setLoading(false);

            }

        }

        checkInitialization();

    }, [navigate]);

    const handleCreateAdmin = async () => {

        try {

            const response = await createUser({
                name,
                email,
                password,
                roleName: "ADMIN_EMPRESA",
            });

            console.log("Administrador creado:", response);

            alert("Administrador creado exitosamente");

            navigate("/login", {
                replace: true,
            });

        } catch (error) {

            console.error("Error al crear el administrador:", error);

            alert("Error al crear el administrador");

        }

    };

    if (loading) {
        return <p>Loading...</p>;
    }

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
                Crear Administrador
            </button>

        </div>

    );

}
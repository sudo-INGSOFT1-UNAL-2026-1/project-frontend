import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    activateUser, 
    deactivateUser, 
    changeUserRole, 
    getUserById
} from "../../services/userService";

import type { User } from "../../types/User";
import { UserRole, roleOptions } from "../../types/UserRole";
import { UserState } from "../../types/UserState";

export default function EditUserPage() {

    const { userId } = useParams<{ userId: string }>();
    
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);

    const [role, setRole] = useState<UserRole | null>(null);

    useEffect(() => { loadUser(); }, [userId]);

    async function loadUser() {
        if (!userId) return;

        try {
            const userResponse = await getUserById({ userId: Number(userId) });

            setUser(userResponse);
            setRole(userResponse.role);
        } catch (error) {
            console.error("Error al cargar el usuario:", error);
            alert("No fue posible cargar el usuario.");
        }
    }

    async function handleChangeRole() {

        if (!user || !role) return;

        try {
            const response = await changeUserRole({ 
                userId: user.id, 
                newRoleName: role 
            });

            setUser(response);
            alert("Rol del usuario actualizado correctamente.");
        } catch (error) {
            console.error("Error al cambiar el rol del usuario:", error);
            alert("No fue posible cambiar el rol del usuario.");
        }
    }

    async function handleActivateUser() {
        if (!user) return;

        try {
            const response = await activateUser({ userId: user.id });
            setUser(response);
            alert("Usuario activado correctamente.");
        } catch (error) {
            console.error("Error al activar el usuario:", error);
            alert("No fue posible activar el usuario.");
        }
    }

    async function handleDeactivateUser() {
        if (!user) return;
        
        try {
        
            const response = await deactivateUser({ userId: user.id });
            
            setUser(response);

            alert("Usuario desactivado correctamente.");
        
        } catch (error) {
            
            console.error("Error al desactivar el usuario:", error);
            
            alert("No fue posible desactivar el usuario.");
        
        }
    }

    if (!user || !role) {
        return <p>Cargando usuario...</p>;
    }

    
    return (
        <div>
            <h1>Editar Usuario</h1>
            <hr />
            <p>
                <strong>Id:</strong> {user.id}
            </p>
            <p>
                <strong>Nombre:</strong> {user.name}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Estado:</strong> 
                {user.state === UserState.ACTIVE ? "Activo" : "Inactivo"}
            </p>

            <div>
                <label>Rol:</label>
                <br />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                > {
                    roleOptions.map((option) => (
                        <option 
                            key={option.value} value={option.value}
                            >
                                {option.label}
                        </option>
                    ))
                }
                </select>
                <button onClick={handleChangeRole}>
                    Cambiar Rol
                </button>

                {user.state === UserState.ACTIVE ? (
                    <button onClick={handleDeactivateUser}>
                        Desactivar Usuario
                    </button>
                ) : (
                    <button onClick={handleActivateUser}>
                        Activar Usuario
                    </button>
                )}
                <button onClick={() => navigate(`/users`)}>
                    Volver
                </button>
            </div>
        </div>
    );
}
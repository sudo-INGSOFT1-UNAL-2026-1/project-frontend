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

    
    return (
        <div>
            <h1>Editar Usuario</h1>
            <hr />
            <p>Esta es la página para editar un usuario.</p>
        </div>
    );
}
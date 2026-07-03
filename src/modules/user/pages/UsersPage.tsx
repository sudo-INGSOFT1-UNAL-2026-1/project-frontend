import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllUsers } from "../services/userService";
import type { User } from "../types/User";


export default function UsersPage() {
    
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);

    async function loadUsers() {

        try {
            const usersData = await getAllUsers();
            setUsers(usersData);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            alert("Error al obtener los usuarios. Por favor, inténtelo de nuevo.");
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);
    
    return (
        <div>
            <h1>Usuarios</h1>
            <button onClick={() => navigate("/users/create")}>
                Crear Usuario
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Correo Electrónico</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={6}>No hay usuarios disponibles.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.state}</td>
                                <td>
                                    <button onClick={() => navigate(`/users/${user.id}/edit`)}>
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <hr />
        </div>
    );
}
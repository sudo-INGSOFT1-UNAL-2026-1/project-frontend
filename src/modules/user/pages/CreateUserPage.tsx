import { useState } from "react";

import { createUser } from "../services/userService";

import { UserRole } from "../types/UserRole";

export default function CreateUserPage() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [role, setRole] = useState<UserRole>(UserRole.EMPLEADO_VENTAS);

    async function handleCreateUser() {

        try {

            const user = await createUser({
                name,
                email,
                password,
                roleName: role,
            });

            console.log("Usuario creado:", user);

            alert("Usuario creado con éxito!");

            setName("");
            setEmail("");
            setPassword("");
            setRole(UserRole.EMPLEADO_VENTAS);
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            alert("Error al crear el usuario. Por favor, inténtelo de nuevo.");
        }
    }

    return (
        <div>
            <h1>Usuarios</h1>
            <hr />

            <h2>Crear Usuario</h2>
            <div>
                <label> Nombre </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label> Correo Electrónico </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label> Contraseña </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <label>Rol</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                >
                    <option value={UserRole.EMPLEADO_VENTAS}>Empleado de Ventas</option>
                    <option value={UserRole.EMPLEADO_INVENTARIO}>Empleado de Almacén</option>
                    <option value={UserRole.EMPLEADO_COMPRAS}>Empleado de Compras</option>
                    <option value={UserRole.EMPLEADO_COMPRAS_INVENTARIO}>Empleado de Compras e Inventario</option>
                    <option value={UserRole.EMPLEADO_VENTAS_COMPRAS}>Empleado de Ventas y Compras</option>
                    <option value={UserRole.EMPLEADO_VENTAS_INVENTARIO}>Empleado de Ventas e Inventario</option>
                    <option value={UserRole.EMPLEADO_TOTAL}>Empleado Total</option>
                    <option value={UserRole.ADMIN_EMPRESA}>Administrador de Empresa</option>
                </select>
            </div>

            <br />

            <button onClick={handleCreateUser}>Crear Usuario</button>
        </div>
    );
} 
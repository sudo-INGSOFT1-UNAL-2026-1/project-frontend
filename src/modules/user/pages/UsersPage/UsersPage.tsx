import { useEffect, useState } from "react";
import { Plus, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../shared/components/Alert";
import Badge from "../../../../shared/components/Badge";
import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import EmptyState from "../../../../shared/components/EmptyState";
import Spinner from "../../../../shared/components/Spinner";
import Table from "../../../../shared/components/Table";

import { getAllUsers } from "../../services/userService";

import type { User } from "../../types/User";

import { roleLabels } from "../../types/UserRole";
import type { TableColumn } from "../../../../shared/components/Table/types";

import "./UsersPage.css";

export default function UsersPage() {

    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {

        setLoading(true);
        setError("");

        try {
            const response = await getAllUsers();
            setUsers(response);
        } catch {
            setError("No fue posible cargar los usuarios.");
        } finally {
            setLoading(false);
        }
    }

    const columns: TableColumn<User>[] = [
        {
            key: "id",
            title: "ID",
        },
        {
            key: "name",
            title: "Nombre",
        },
        {
            key: "email",
            title: "Correo",
        },
        {
            key: "role",
            title: "Rol",
            render: (user) => roleLabels[user.role as keyof typeof roleLabels],
        },
        {
            key: "state",
            title: "Estado",
            render: (user) => (
                <Badge
                    variant={
                        user.state === "activo"
                            ? "success"
                            : "danger"
                    }
                >
                    {user.state}
                </Badge>
            ),
        },
        {
            key: "actions",
            title: "Acciones",
            render: (user) => (
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                        navigate(`/users/${user.id}/edit`)
                    }
                >
                    <SquarePen size={16} />
                    Editar
                </Button>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="users-page__loading">
                <Spinner label="Cargando usuarios..." />
            </div>
        );
    }

    return (
        <div className="users-page">

            <div className="users-page__header">

                <div>
                    <h1 className="users-page__title">
                        Usuarios
                    </h1>

                    <p className="users-page__subtitle">
                        Administre las cuentas del sistema.
                    </p>
                </div>

                <Button
                    onClick={() =>
                        navigate("/users/create")
                    }
                >
                    <Plus size={18} />
                    Crear usuario
                </Button>

            </div>

            {error && (
                <Alert
                    variant="danger"
                    title="Error"
                    closable
                    onClose={() => setError("")}
                >
                    {error}
                </Alert>
            )}

            <Card>

                {users.length === 0 ? (
                    <EmptyState
                        title="No hay usuarios"
                        description="Todavía no existen usuarios registrados."
                    />
                ) : (
                    <Table<User>
                        columns={columns}
                        data={users}
                    />
                )}

            </Card>

        </div>
    );
}
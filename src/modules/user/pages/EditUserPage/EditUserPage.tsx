import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "../../../../shared/components/Alert";
import Badge from "../../../../shared/components/Badge";
import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import Select from "../../../../shared/components/Select";
import Spinner from "../../../../shared/components/Spinner";
import Toast from "../../../../shared/components/Toast";

import {
    activateUser,
    changeUserRole,
    deactivateUser,
    getUserById,
} from "../../services/userService";

import type { User } from "../../types/User";
import {
    roleOptions,
    UserRole,
} from "../../types/UserRole";
import { UserState } from "../../types/UserState";

import "./EditUserPage.css";

export default function EditUserPage() {

    const { userId } = useParams<{
        userId: string;
    }>();

    const navigate = useNavigate();

    const [user, setUser] =
        useState<User | null>(null);

    const [role, setRole] =
        useState<UserRole>();

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [toastOpen, setToastOpen] =
        useState(false);

    const [toastMessage, setToastMessage] =
        useState("");

    useEffect(() => {
        loadUser();
    }, [userId]);

    async function loadUser() {

        if (!userId) {
            return;
        }

        setLoading(true);
        setError("");

        try {

            const response =
                await getUserById({
                    userId: Number(userId),
                });

            setUser(response);
            setRole(response.roleName);

        } catch {

            setError(
                "No fue posible cargar la información del usuario."
            );

        } finally {

            setLoading(false);

        }

    }

    async function handleChangeRole() {

        if (!user || !role) {
            return;
        }

        setSaving(true);

        try {

            const response =
                await changeUserRole({
                    userId: user.id,
                    newRoleName: role,
                });

            setUser(response);

            setToastMessage(
                "Rol actualizado correctamente."
            );

            setToastOpen(true);

        } catch {

            setError(
                "No fue posible actualizar el rol del usuario."
            );

        } finally {

            setSaving(false);

        }

    }

    async function handleChangeState() {

        if (!user) {
            return;
        }

        setSaving(true);

        try {

            const response =
                user.state === UserState.ACTIVE
                    ? await deactivateUser({
                          userId: user.id,
                      })
                    : await activateUser({
                          userId: user.id,
                      });

            setUser(response);

            setToastMessage(
                user.state === UserState.ACTIVE
                    ? "Usuario desactivado correctamente."
                    : "Usuario activado correctamente."
            );

            setToastOpen(true);

        } catch {

            setError(
                "No fue posible actualizar el estado del usuario."
            );

        } finally {

            setSaving(false);

        }

    }

    if (loading) {
        return (
            <div className="edit-user-page__loading">
                <Spinner label="Cargando usuario..." />
            </div>
        );
    }

    if (!user || !role) {
        return null;
    }

    return (
        <div className="edit-user-page">

            <Toast
                open={toastOpen}
                variant="success"
                message={toastMessage}
                onClose={() => setToastOpen(false)}
            />

            <div className="edit-user-page__header">

                <div>

                    <h1 className="edit-user-page__title">
                        Editar usuario
                    </h1>

                    <p className="edit-user-page__subtitle">
                        Administre la información del usuario.
                    </p>

                </div>

                <Button
                    variant="secondary"
                    onClick={() => navigate("/users")}
                >
                    <ArrowLeft size={18} />
                    Volver
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

                <div className="edit-user-page__info">

                    <div>

                        <span className="edit-user-page__label">
                            ID
                        </span>

                        <p>{user.id}</p>

                    </div>

                    <div>

                        <span className="edit-user-page__label">
                            Nombre
                        </span>

                        <p>{user.name}</p>

                    </div>

                    <div>

                        <span className="edit-user-page__label">
                            Correo electrónico
                        </span>

                        <p>{user.email}</p>

                    </div>

                    <div>

                        <span className="edit-user-page__label">
                            Estado
                        </span>

                        <Badge
                            variant={
                                user.state.toLowerCase() === "activo"
                                    ? "success"
                                    : "danger"
                            }
                        >
                            {user.state}
                        </Badge>

                    </div>

                </div>

                <div className="edit-user-page__actions">

                    <Select
                        label="Rol"
                        value={role}
                        disabled={saving}
                        onChange={(event) =>
                            setRole(
                                event.target
                                    .value as UserRole
                            )
                        }
                        options={roleOptions}
                    />

                    <div className="edit-user-page__buttons">

                        <Button
                            loading={saving}
                            onClick={handleChangeRole}
                        >
                            <Save size={18} />
                            Guardar rol
                        </Button>

                        <Button
                            loading={saving}
                            variant={
                                user.state.toLowerCase() === "activo"
                                    ? "danger"
                                    : "success"
                            }
                            onClick={handleChangeState}
                        >
                            {user.state.toLowerCase() === "activo"
                                ? "Desactivar usuario"
                                : "Activar usuario"}
                        </Button>

                    </div>

                </div>

            </Card>

        </div>
    );
}
import { useState, type FormEvent } from "react";

import Alert from "../../../../shared/components/Alert";
import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import Input from "../../../../shared/components/Input";
import Select from "../../../../shared/components/Select";

import { createUser } from "../../services/userService";

import { UserRole, roleOptions } from "../../types/UserRole";

import "./CreateUserPage.css";

export default function CreateUserPage() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [role, setRole] = useState<UserRole>(
        UserRole.EMPLEADO_VENTAS
    );

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (loading) {
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            await createUser({
                name,
                email,
                password,
                roleName: role,
            });

            setSuccess(
                "El usuario fue creado correctamente."
            );

            setName("");
            setEmail("");
            setPassword("");
            setRole(UserRole.EMPLEADO_VENTAS);

        } catch {

            setError(
                "No fue posible crear el usuario."
            );

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="create-user-page">

            <div className="create-user-page__header">

                <h1 className="create-user-page__title">
                    Crear usuario
                </h1>

                <p className="create-user-page__subtitle">
                    Registre un nuevo usuario en el sistema.
                </p>

            </div>

            <Card>

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

                {success && (
                    <Alert
                        variant="success"
                        title="Éxito"
                        closable
                        onClose={() => setSuccess("")}
                    >
                        {success}
                    </Alert>
                )}

                <form
                    className="create-user-page__form"
                    onSubmit={handleSubmit}
                >

                    <Input
                        label="Nombre completo"
                        value={name}
                        required
                        disabled={loading}
                        placeholder="Ingrese el nombre"
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />

                    <Input
                        label="Correo electrónico"
                        type="email"
                        value={email}
                        required
                        disabled={loading}
                        placeholder="Ingrese el correo"
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        value={password}
                        required
                        disabled={loading}
                        placeholder="Ingrese la contraseña"
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />

                    <Select
                        label="Rol"
                        value={role}
                        options={roleOptions}
                        disabled={loading}
                        onChange={(event) =>
                            setRole(
                                event.target.value as UserRole
                            )
                        }
                    />

                    <div className="create-user-page__actions">

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Crear usuario
                        </Button>

                    </div>

                </form>

            </Card>

        </div>
    );
}
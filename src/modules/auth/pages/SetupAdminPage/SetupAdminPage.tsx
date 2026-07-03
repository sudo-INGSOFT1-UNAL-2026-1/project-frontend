import { useEffect, useState } from "react";
import { ShieldPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../shared/components/Alert";
import Button from "../../../../shared/components/Button";
import Input from "../../../../shared/components/Input";
import Spinner from "../../../../shared/components/Spinner";

import AuthLayout from "../../components/AuthLayout";

import { getInitializationStatus } from "../../services/authApi";
import { createUser } from "../../../user/api/userApi";

import "./SetupAdminPage.css";

export default function SetupAdminPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

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

    async function handleCreateAdmin() {

        if (submitting) {
            return;
        }

        setError("");
        setSubmitting(true);

        try {

            await createUser({
                name,
                email,
                password,
                roleName: "ADMIN_EMPRESA",
            });

            navigate("/login", {
                replace: true,
            });

        } catch {

            setError(
                "No fue posible crear el administrador del sistema."
            );

        } finally {

            setSubmitting(false);

        }
    }

    if (loading) {
        return (
            <AuthLayout
                logo={<ShieldPlus size={52} />}
                title="Configuración inicial"
                subtitle="Preparando el sistema..."
            >
                <Spinner label="Inicializando sistema..." />
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            logo={<ShieldPlus size={52} />}
            title="Configuración inicial"
            subtitle="Cree el primer administrador del sistema."
        >
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

            <form
                className="setup-admin-page__form"
                onSubmit={(event) => {
                    event.preventDefault();
                    handleCreateAdmin();
                }}
            >
                <Input
                    label="Nombre completo"
                    value={name}
                    placeholder="Ingrese el nombre completo"
                    autoComplete="name"
                    autoFocus
                    required
                    disabled={submitting}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                />

                <Input
                    label="Correo electrónico"
                    type="email"
                    value={email}
                    placeholder="Ingrese el correo electrónico"
                    autoComplete="email"
                    required
                    disabled={submitting}
                    onChange={(event) =>
                        setEmail(event.target.value)
                    }
                />

                <Input
                    label="Contraseña"
                    type="password"
                    value={password}
                    placeholder="Ingrese una contraseña segura"
                    autoComplete="new-password"
                    required
                    disabled={submitting}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                />

                <Button
                    type="submit"
                    fullWidth
                    loading={submitting}
                >
                    Crear administrador
                </Button>
            </form>
        </AuthLayout>
    );
}
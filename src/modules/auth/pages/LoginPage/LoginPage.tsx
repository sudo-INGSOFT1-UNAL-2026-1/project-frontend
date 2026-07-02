import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../shared/components/Alert";
import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import Input from "../../../../shared/components/Input";

import { login } from "../../services/authApi";
import { setSession } from "../../../../shared/utils/sessionManager";

import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleLogin() {
        if (loading) {
        return;
        }

        setError("");
        setLoading(true);

        try {
        const response = await login({
            email,
            password,
        });

        setSession(response);

        navigate("/dashboard", {
            replace: true,
        });
        } catch {
        setError(
            "El correo electrónico o la contraseña son incorrectos."
        );
        } finally {
        setLoading(false);
        }
    }

    return (
        <div className="login-page">
        <Card className="login-page__card">
            <div className="login-page__header">
            <h1 className="login-page__title">
                UNERP
            </h1>

            <p className="login-page__subtitle">
                Inicie sesión para acceder al sistema.
            </p>
            </div>

            {error && (
            <Alert
                variant="danger"
                title="Error de autenticación"
            >
                {error}
            </Alert>
            )}

            <form
            className="login-page__form"
            onSubmit={(event) => {
                event.preventDefault();
                handleLogin();
            }}
            >
            <Input
                label="Correo electrónico"
                type="email"
                value={email}
                placeholder="Ingrese su correo"
                autoComplete="email"
                autoFocus
                required
                disabled={loading}
                onChange={(event) =>
                setEmail(event.target.value)
                }
            />

            <Input
                label="Contraseña"
                type="password"
                value={password}
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
                required
                disabled={loading}
                onChange={(event) =>
                setPassword(event.target.value)
                }
            />

            <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
            >
                Iniciar sesión
            </Button>
            </form>
        </Card>
        </div>
    );
}
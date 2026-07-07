import { useNavigate } from "react-router-dom";

import Button from "../Button";

import { logout } from "../../../modules/auth/services/authApi";
import { getCurrentUser, removeSession } from "../../utils/sessionManager";

import "./Header.css";

export default function Header() {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    async function handleLogout() {
        try {
        await logout();
        } finally {
        removeSession();
        navigate("/login", {
            replace: true,
        });
        }
    }

    return (
        <header className="header">
        <div className="header__brand">
            <h1 className="header__title">
            UNERP
            </h1>

            <span className="header__subtitle">
            Sistema de Gestión Empresarial
            </span>
        </div>

        <div className="header__actions">
            <div className="header__user">
            <span className="header__welcome">
                Bienvenido
            </span>

            <span className="header__name">
                {currentUser?.name ?? "Usuario"}
            </span>

            {currentUser?.role && (
                <span className="header__role">
                {currentUser.role}
                </span>
            )}
            </div>

            <Button
            variant="danger"
            size="sm"
            onClick={handleLogout}
            >
            Cerrar sesión
            </Button>
        </div>
        </header>
    );
}
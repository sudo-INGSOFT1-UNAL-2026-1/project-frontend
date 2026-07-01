import {useNavigate} from "react-router-dom";

import {logout} from "../../modules/auth/services/authApi";

import { removeSession, getCurrentUser } from "../utils/sessionManager";

export default function Header() {

    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    async function handleLogout() {
        
        try {

            await logout();
    } finally {
        
        removeSession();
        navigate("/login", { replace: true });
        }
    }

    return (
        <header>
            <h2>UNERP</h2>

            <span>Bienvenido, {currentUser?.name}</span>

            <button onClick={handleLogout}>Cerrar sesión</button>
        </header>
    );
}
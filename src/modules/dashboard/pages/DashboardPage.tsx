import { useNavigate } from "react-router-dom";

import { logout } from "../../auth/services/authApi";
import { removeToken } from "../../../shared/utils/sessionManager";


export default function DashboardPage() {

    const navigate = useNavigate();

    async function handleLogout() {
    
        try {
            await logout();
    } finally {
            removeToken();
            
            navigate("/login", { replace: true });
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../shared/utils/sessionManager";
import { getInitializationStatus } from "../modules/auth/services/authApi";

interface PublicRouteProps {
    children: React.ReactNode;
}


export default function PublicRoute({ children }: PublicRouteProps) {

    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        async function checkInitialization() {
            try {
                const response = await getInitializationStatus();
                setInitialized(response.initialized);
            } finally {
                setLoading(false);
            }
        }

        checkInitialization();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!initialized) {
        return <Navigate to="/setup-admin" replace />;
    }

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
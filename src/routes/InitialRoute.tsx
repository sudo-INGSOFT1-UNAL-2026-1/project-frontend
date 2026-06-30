import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import {getInitializationStatus} from "../modules/auth/services/authApi";
import { isAuthenticated } from "../shared/utils/sessionManager";

export default function InitialRoute() {

    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {

        async function initialize() {
            try {
                const response = await getInitializationStatus();
                
                setInitialized(response.initialized);
        } finally {
            setLoading(false);
        }
    }

    initialize();
    
    },[]);
    
    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!initialized) {
        return <Navigate to="/setup-admin" replace />;
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <Navigate to="/dashboard" replace />;
}
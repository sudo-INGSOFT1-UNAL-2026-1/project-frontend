import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../shared/utils/sessionManager";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;


}
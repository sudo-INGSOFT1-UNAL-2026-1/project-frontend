import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../shared/utils/sessionManager";

interface PublicRouteProps {
    children: React.ReactNode;
}


export default function PublicRoute({ children }: PublicRouteProps) {

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
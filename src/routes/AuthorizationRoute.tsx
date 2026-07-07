import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

import { canAccess } from "../shared/utils/authorization";

import type { Permission } from "../shared/utils/permissions";

interface AuthorizationRouteProps {

    children: ReactNode;

    permission: Permission;

}

export default function AuthorizationRoute({

    children,

    permission,

}: AuthorizationRouteProps) {

    if (!canAccess(permission)) {

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}


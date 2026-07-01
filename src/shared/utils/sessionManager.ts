import type { LoginResponse } from "../../modules/auth/types/LoginResponse";
import type { UserRole } from "../../modules/user/types/UserRole";

const SESSION_KEY = "session";

export function setSession(session: LoginResponse): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): LoginResponse | null {
    const sessionData = localStorage.getItem(SESSION_KEY);
    
    if (sessionData) {
        return JSON.parse(sessionData) as LoginResponse;
    }

    return null;
}

export function removeSession(): void {
    localStorage.removeItem(SESSION_KEY);
}

export function getToken(): string | null {
    return getSession()?.token ?? null;
}


export function getCurrentUser(): LoginResponse | null {
    return getSession();
}

export function isAuthenticated(): boolean {
    return getToken() !== null;
}

export function getCurrentRole(): UserRole | null {
    return getSession()?.role ?? null;
}

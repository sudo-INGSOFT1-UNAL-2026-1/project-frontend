import { BrowserRouter, Routes, Route } from "react-router-dom";

import InitialRoute from "./InitialRoute";

import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import LoginPage from "../modules/auth/pages/LoginPage";
import SetupAdminPage from "../modules/auth/pages/SetupAdminPage";

export default function AppRouter() {
    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={<InitialRoute />} 
                    />
                
                <Route
                    path="/login"
                    element={<LoginPage />}
                /> 

                <Route
                    path="/setup-admin"
                    element={<SetupAdminPage />}
                />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />
            </Routes>
        </BrowserRouter>
    )
}
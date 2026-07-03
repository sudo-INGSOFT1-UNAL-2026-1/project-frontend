import { BrowserRouter, Routes, Route } from "react-router-dom";

import InitialRoute from "./InitialRoute";

import DashboardPage from "../modules/dashboard/pages/DashboardPage/DashboardPage";
import LoginPage from "../modules/auth/pages/LoginPage/LoginPage";
import SetupAdminPage from "../modules/auth/pages/SetupAdminPage/SetupAdminPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../shared/components/Layout/Layout";
import UsersPage from "../modules/user/pages/UsersPage";
import InventoryPage from "../modules/inventory/pages/InventoryPage";
import PurchasesPage from "../modules/purchases/pages/PurchasesPage";
import SalesPage from "../modules/sales/pages/SalesPage";
import CreateUserPage from "../modules/user/pages/CreateUserPage/CreateUserPage";
import EditUserPage from "../modules/user/pages/EditUserPage";

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
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/setup-admin"
                    element={
                    <SetupAdminPage />
                    }
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route path="/users">
                        <Route index element={<UsersPage />} />

                        <Route
                            path="create" 
                            element={<CreateUserPage />} 
                        />

                        <Route
                            path="edit/:userId"
                            element={<EditUserPage />} 
                        />
                    </Route>

                    <Route
                        path="/inventory"
                        element={<InventoryPage />}
                    />                    <Route
                        path="/purchases"
                        element={<PurchasesPage />}
                    />                    <Route
                        path="/sales"
                        element={<SalesPage />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
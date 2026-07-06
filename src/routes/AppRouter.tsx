import { BrowserRouter, Routes, Route } from "react-router-dom";

import InitialRoute from "./InitialRoute";

import DashboardPage from "../modules/dashboard/pages/DashboardPage/DashboardPage";
import LoginPage from "../modules/auth/pages/LoginPage/LoginPage";
import SetupAdminPage from "../modules/auth/pages/SetupAdminPage/SetupAdminPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../shared/components/Layout/Layout";
import UsersPage from "../modules/user/pages/UsersPage/UsersPage";
import ProductsPage from "../modules/inventory/pages/ProductsPage";
import CreateProductPage from "../modules/inventory/pages/CreateProductPage";
import EditProductPage from "../modules/inventory/pages/EditProductPage/EditProductPage";
import PurchasesPage from "../modules/purchases/pages/PurchasesPage";
import SalesPage from "../modules/sales/pages/SalesPage";
import CreateUserPage from "../modules/user/pages/CreateUserPage/CreateUserPage";
import EditUserPage from "../modules/user/pages/EditUserPage/EditUserPage";

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
                        path="/inventory">
                        
                        <Route
                            path="products"
                            element={
                                <ProtectedRoute>
                                    <ProductsPage />
                                </ProtectedRoute>
                                }
                        />
                        <Route
                            path="products/create"
                            element={
                                <ProtectedRoute>
                                    <CreateProductPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="products/edit/:productId"
                            element={
                                <ProtectedRoute>
                                    <EditProductPage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                    <Route
                        path="/purchases"
                        element={<PurchasesPage />}
                    />
                    <Route
                        path="/sales"
                        element={<SalesPage />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
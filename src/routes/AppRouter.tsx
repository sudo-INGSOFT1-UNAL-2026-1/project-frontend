import { BrowserRouter, Routes, Route } from "react-router-dom";

import InitialRoute from "./InitialRoute";

import DashboardPage from "../modules/dashboard/pages/DashboardPage/DashboardPage";
import LoginPage from "../modules/auth/pages/LoginPage/LoginPage";
import SetupAdminPage from "../modules/auth/pages/SetupAdminPage/SetupAdminPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AuthorizationRoute from "./AuthorizationRoute";
import Layout from "../shared/components/Layout/Layout";
import UsersPage from "../modules/user/pages/UsersPage/UsersPage";
import ProductsPage from "../modules/product/pages/ProductsPage";
import CreateProductPage from "../modules/product/pages/CreateProductPage";
import EditProductPage from "../modules/product/pages/EditProductPage/EditProductPage";
import CreateSupplierPage from "../modules/purchases/supplier/pages/SuppliersPage";
import EditSupplierPage from "../modules/purchases/supplier/pages/EditSupplierPage";
import SuppliersPage from "../modules/purchases/supplier/pages/SuppliersPage";
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

                        <Route index element={
                            <ProtectedRoute>
                                    <AuthorizationRoute permission="canAccessUsers">
                                        <UsersPage />
                                    </AuthorizationRoute>
                            </ProtectedRoute>
                        } />

                        <Route
                            path="create" 
                            element={
                            <ProtectedRoute>
                                    <AuthorizationRoute permission="canAccessUsers">
                                        <CreateUserPage />
                                    </AuthorizationRoute>
                            </ProtectedRoute>
                        } 
                        />

                        <Route
                            path="edit/:userId"
                            element={
                                <ProtectedRoute>
                                    <AuthorizationRoute permission="canAccessUsers">
                                        <EditUserPage />
                                    </AuthorizationRoute>
                                </ProtectedRoute>
                            } 
                        />
                    </Route>

                    <Route
                        path="/inventory">
                        
                        <Route
                            path="products"
                            element={
                                <ProtectedRoute>
                                    <AuthorizationRoute permission="canAccessInventory">
                                        <ProductsPage />
                                    </AuthorizationRoute>
                                </ProtectedRoute>
                                }
                        />
                        <Route
                            path="products/create"
                            element={
                                <ProtectedRoute>
                                    <AuthorizationRoute permission="canAccessInventory">
                                    <CreateProductPage />
                                    </AuthorizationRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="products/edit/:productId"
                            element={
                                <ProtectedRoute>
                                    <AuthorizationRoute permission="canAccessInventory">
                                        <EditProductPage />
                                    </AuthorizationRoute>
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                    <Route path="/purchases">
                            <Route
                                path= "suppliers"
                                element={
                                    <ProtectedRoute>
                                        <AuthorizationRoute permission="canAccessPurchases">
                                        <SuppliersPage />
                                        </AuthorizationRoute>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="suppliers/create"
                                element={
                                    <ProtectedRoute>
                                        <AuthorizationRoute permission="canAccessPurchases">
                                        <CreateSupplierPage />
                                        </AuthorizationRoute>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="suppliers/edit/:Id"
                                element={
                                    <ProtectedRoute>
                                        <AuthorizationRoute permission="canAccessPurchases">
                                        <EditSupplierPage />
                                        </AuthorizationRoute>
                                    </ProtectedRoute>
                                }
                            />
                    </Route>
                    <Route
                        path="/sales"
                        element={<SalesPage />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
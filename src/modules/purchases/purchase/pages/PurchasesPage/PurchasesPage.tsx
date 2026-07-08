import { useEffect, useState } from "react";
import { Plus, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import EmptyState from "../../../../../shared/components/EmptyState";
import Spinner from "../../../../../shared/components/Spinner";
import Table from "../../../../../shared/components/Table";

import { getAllPurchases } from "../../services/purchaseService";
import { getAllSuppliers } from "../../../supplier/services/supplierService";
import { getAllUsers } from "../../../../user/services/userService";

import type { Purchase } from "../../types/Purchase";
import type { Supplier } from "../../../supplier/types/Supplier";
import type { User } from "../../../../user/types/User";

import type { TableColumn } from "../../../../../shared/components/Table/types";

export default function PurchasesPage() {

    const navigate = useNavigate();

    const [purchases, setPurchases] = useState<Purchase[]>([]);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [users, setUsers] = useState<User[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        setLoading(true);

        setError("");

        try {

            const [

                purchasesResponse,

                suppliersResponse,

                usersResponse,

            ] = await Promise.all([

                getAllPurchases(),

                getAllSuppliers(),

                getAllUsers(),

            ]);

            setPurchases(purchasesResponse);

            setSuppliers(suppliersResponse);

            setUsers(usersResponse);

        } catch {

            setError(
                "No fue posible cargar las compras."
            );

        } finally {

            setLoading(false);

        }

    }

    function getSupplierName(supplierId: number) {

        const supplier = suppliers.find(
            (supplier) => supplier.id === supplierId
        );

        return supplier
            ? supplier.name
            : `#${supplierId}`;

    }

    function getUserName(userId: number) {

        const user = users.find(
            (user) => user.id === userId
        );

        return user
            ? user.name
            : `#${userId}`;

    }

    const columns: TableColumn<Purchase>[] = [

        {
            key: "id",
            title: "ID",
        },

        {
            key: "supplier",
            title: "Proveedor",
            render: (purchase) =>
                getSupplierName(
                    purchase.supplierId
                ),
        },

        {
            key: "user",
            title: "Usuario",
            render: (purchase) =>
                getUserName(
                    purchase.userId
                ),
        },

        {
            key: "paymentDate",
            title: "Fecha Pago",
        },

        {
            key: "deliveryDate",
            title: "Fecha Entrega",
        },

        {
            key: "state",
            title: "Estado",
        },

        {
            key: "totalCost",
            title: "Total",
            render: (purchase) =>
                `$${purchase.totalCost}`,
        },

        {
            key: "actions",
            title: "Acciones",
            render: (purchase) => (

                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                        navigate(
                            `/purchases/edit/${purchase.id}`
                        )
                    }
                >

                    <SquarePen size={16} />

                    Editar

                </Button>

            ),
        },

    ];

    if (loading) {

        return (

            <div>

                <Spinner
                    label="Cargando compras..."
                />

            </div>

        );

    }

    return (

        <div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >

                <div>

                    <h1>Compras</h1>

                    <p>
                        Administre las compras del sistema.
                    </p>

                </div>

                <Button
                    onClick={() =>
                        navigate(
                            "/purchases/create"
                        )
                    }
                >

                    <Plus size={18} />

                    Nueva compra

                </Button>

            </div>

            {error && (

                <Alert
                    variant="danger"
                    title="Error"
                    closable
                    onClose={() =>
                        setError("")
                    }
                >

                    {error}

                </Alert>

            )}

            <Card>

                {purchases.length === 0 ? (

                    <EmptyState
                        title="No hay compras"
                        description="Todavía no existen compras registradas."
                    />

                ) : (

                    <Table<Purchase>
                        columns={columns}
                        data={purchases}
                    />

                )}

            </Card>

        </div>

    );

}
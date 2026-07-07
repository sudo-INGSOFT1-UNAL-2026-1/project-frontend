import { useEffect, useState } from "react";
import { Plus, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import EmptyState from "../../../../../shared/components/EmptyState";
import Spinner from "../../../../../shared/components/Spinner";
import Table from "../../../../../shared/components/Table";

import { getAllSuppliers } from "../../services/supplierService";

import type { Supplier } from "../../types/Supplier";

import type { TableColumn } from "../../../../../shared/components/Table/types";

import "./SuppliersPage.css";

export default function SuppliersPage() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        loadSuppliers();
    }, []);

    async function loadSuppliers() {

        setLoading(true);
        setError("");

        try {

            const response =
                await getAllSuppliers();

            setSuppliers(response);

        } catch {

            setError(
                "No fue posible cargar los proveedores."
            );

        } finally {

            setLoading(false);

        }

    }

    const columns: TableColumn<Supplier>[] = [
        {
            key: "id",
            title: "ID",
        },
        {
            key: "name",
            title: "Nombre",
        },
        {
            key: "phone",
            title: "Teléfono",
        },
        {
            key: "email",
            title: "Correo electrónico",
        },
        {
            key: "actions",
            title: "Acciones",
            render: (supplier) => (
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                        navigate(
                            `/purchases/suppliers/edit/${supplier.id}`
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
            <div className="suppliers-page__loading">
                <Spinner label="Cargando proveedores..." />
            </div>
        );
    }

    return (

        <div className="suppliers-page">

            <div className="suppliers-page__header">

                <div>

                    <h1 className="suppliers-page__title">
                        Proveedores
                    </h1>

                    <p className="suppliers-page__subtitle">
                        Administre los proveedores del sistema.
                    </p>

                </div>

                <Button
                    onClick={() =>
                        navigate(
                            "/purchases/suppliers/create"
                        )
                    }
                >
                    <Plus size={18} />
                    Crear proveedor
                </Button>

            </div>

            {error && (
                <Alert
                    variant="danger"
                    title="Error"
                    closable
                    onClose={() => setError("")}
                >
                    {error}
                </Alert>
            )}

            <Card>

                {suppliers.length === 0 ? (

                    <EmptyState
                        title="No hay proveedores"
                        description="Todavía no existen proveedores registrados."
                    />

                ) : (

                    <Table<Supplier>
                        columns={columns}
                        data={suppliers}
                    />

                )}

            </Card>

        </div>

    );

}
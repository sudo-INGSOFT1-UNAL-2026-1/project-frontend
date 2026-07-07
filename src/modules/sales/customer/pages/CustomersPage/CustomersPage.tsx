import { useEffect, useState } from "react";
import { Plus, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import EmptyState from "../../../../shared/components/EmptyState";
import Spinner from "../../../../shared/components/Spinner";
import Table from "../../../../../shared/components/Table";

import { getAllCustomers } from "../../services/customerService";

import type { Customer } from "../../types/Customer";

import type { TableColumn } from "../../../../../shared/components/Table/types";

import "./CustomersPage.css";

export default function CustomersPage() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState<Customer[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadCustomers();

    }, []);

    async function loadCustomers() {

        setLoading(true);

        setError("");

        try {

            const response = await getAllCustomers();

            setCustomers(response);

        } catch {

            setError("No fue posible cargar los clientes.");

        } finally {

            setLoading(false);

        }

    }

    const columns: TableColumn<Customer>[] = [
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
            render: (customer) => (
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                        navigate(`/sales/customers/edit/${customer.id}`)
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
            <div className="customers-page__loading">
                <Spinner label="Cargando clientes..." />
            </div>
        );

    }

    return (

        <div className="customers-page">

            <div className="customers-page__header">

                <div>

                    <h1 className="customers-page__title">
                        Clientes
                    </h1>

                    <p className="customers-page__subtitle">
                        Administre los clientes del sistema.
                    </p>

                </div>

                <Button
                    onClick={() =>
                        navigate("/sales/customers/create")
                    }
                >
                    <Plus size={18} />
                    Crear cliente
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

                {customers.length === 0 ? (

                    <EmptyState
                        title="No hay clientes"
                        description="Todavía no existen clientes registrados."
                    />

                ) : (

                    <Table<Customer>
                        columns={columns}
                        data={customers}
                    />

                )}

            </Card>

        </div>

    );

}
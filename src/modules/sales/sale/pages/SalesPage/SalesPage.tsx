import { useEffect, useState } from "react";
import { Plus, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import EmptyState from "../../../../../shared/components/EmptyState";
import Spinner from "../../../../../shared/components/Spinner";
import Table from "../../../../../shared/components/Table";

import { getAllSales } from "../../services/saleService";

import type { Sale } from "../../types/Sale";
import type { TableColumn } from "../../../../../shared/components/Table/types";

export default function SalesPage() {

    const navigate = useNavigate();

    const [sales, setSales] = useState<Sale[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadSales();

    }, []);

    async function loadSales() {

        setLoading(true);

        setError("");

        try {

            const response = await getAllSales();

            setSales(response);

        } catch {

            setError("No fue posible cargar las ventas.");

        } finally {

            setLoading(false);

        }

    }

    const columns: TableColumn<Sale>[] = [
        {
            key: "id",
            title: "ID",
            width: "80px",
        },
        {
            key: "customerName",
            title: "Cliente",
            width: "30%",
        },
        {
            key: "deliveryDate",
            title: "Fecha entrega",
        },
        {
            key: "status",
            title: "Estado",
        },
        {
            key: "totalCost",
            title: "Total",
            render: (sale) =>
                new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                }).format(sale.totalCost),
        },
        {
            key: "actions",
            title: "Acciones",
            width: "150px",
            align: "center",
            render: (sale) => (
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/sales/edit/${sale.id}`)}
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

                <Spinner label="Cargando ventas..." />

            </div>

        );

    }

    return (

        <div className="customers-page">

            <div className="customers-page__header">

                <div>

                    <h1 className="customers-page__title">Ventas</h1>

                    <p className="customers-page__subtitle">
                        Administre las ventas del sistema.
                    </p>

                </div>

                <Button onClick={() => navigate("/sales/quote")}>
                    <Plus size={18} />
                    Nueva cotización
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

                {sales.length === 0 ? (

                    <EmptyState
                        title="No hay ventas"
                        description="Todavía no existen ventas registradas."
                    />

                ) : (

                    <Table<Sale>
                        columns={columns}
                        data={sales}
                    />

                )}

            </Card>

        </div>

    );

}
import { useEffect, useState } from "react";
import { Plus, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Badge from "../../../../../shared/components/Badge";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import EmptyState from "../../../../../shared/components/EmptyState";
import Spinner from "../../../../../shared/components/Spinner";
import Table from "../../../../../shared/components/Table";

import type { TableColumn } from "../../../../../shared/components/Table/types";

import { getAllProducts } from "../../services/productService";

import type { Product } from "../../types/Product";

import "./ProductsPage.css";

export default function ProductsPage() {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {

        setLoading(true);

        setError("");

        try {

            const response = await getAllProducts();

            setProducts(response);

        } catch {

            setError(
                "No fue posible cargar los productos."
            );

        } finally {

            setLoading(false);

        }

    }

    const columns: TableColumn<Product>[] = [
        {
            key: "id",
            title: "ID",
        },
        {
            key: "name",
            title: "Nombre",
        },
        {
            key: "description",
            title: "Descripción",
            render: (product) => (
                <span
                    className="products-page__description"
                    title={product.description}
                >
                    {product.description}
                </span>
            ),
        },
        {
            key: "price",
            title: "Precio",
            align: "right",
            render: (product) =>
                new Intl.NumberFormat(
                    "es-CO",
                    {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                    }
                ).format(product.price),
        },
        {
            key: "stock",
            title: "Stock",
            align: "center",
            render: (product) => (
                <Badge
                    variant={
                        product.stock > 10
                            ? "success"
                            : product.stock > 0
                            ? "warning"
                            : "danger"
                    }
                >
                    {product.stock}
                </Badge>
            ),
        },
        {
            key: "batch",
            title: "Lote",
        },
        {
            key: "expirationDate",
            title: "Vencimiento",
        },
        {
            key: "supplierId",
            title: "Proveedor",
        },
        {
            key: "actions",
            title: "Acciones",
            render: (product) => (
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                        navigate(`/inventory/products/edit/${product.id}`)
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
            <div className="products-page__loading">
                <Spinner
                    label="Cargando productos..."
                />
            </div>
        );
    }

    return (

        <div className="products-page">

            <div className="products-page__header">

                <div>

                    <h1 className="products-page__title">
                        Productos
                    </h1>

                    <p className="products-page__subtitle">
                        Administre el inventario de productos.
                    </p>

                </div>

                <Button
                    onClick={() =>
                        navigate(
                            "/inventory/products/create"
                        )
                    }
                >
                    <Plus size={18} />
                    Agregar producto
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

                {products.length === 0 ? (

                    <EmptyState
                        title="No hay productos"
                        description="Todavía no existen productos registrados."
                    />

                ) : (

                    <Table<Product>
                        columns={columns}
                        data={products}
                    />

                )}

            </Card>

        </div>

    );

}
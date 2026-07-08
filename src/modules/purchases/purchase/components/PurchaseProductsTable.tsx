import { Trash2 } from "lucide-react";

import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import EmptyState from "../../../../shared/components/EmptyState";
import Table from "../../../../shared/components/Table";

import type { TableColumn } from "../../../../shared/components/Table/types";

import type { Product } from "../../../inventory/product/types/Product";
import type { PurchaseProductRequest } from "../types/PurchaseProductRequest";

interface PurchaseProductsTableProps {

    items: PurchaseProductRequest[];

    products: Product[];

    onRemove: (index: number) => void;

}

interface PurchaseProductRow
    extends PurchaseProductRequest {

    index: number;

}

export default function PurchaseProductsTable({

    items,

    products,

    onRemove,

}: PurchaseProductsTableProps) {

    function getProductName(
        productId: number
    ) {

        const product = products.find(
            (item) =>
                item.id === productId
        );

        return product?.name ??
            "Producto";

    }

    const rows: PurchaseProductRow[] =
        items.map(
            (item, index) => ({

                ...item,

                index,

            })
        );

    const columns: TableColumn<PurchaseProductRow>[] = [
        {
            key: "productId",
            title: "Producto",
            render: (item) =>
                getProductName(
                    item.productId
                ),
        },
        {
            key: "quantity",
            title: "Cantidad",
        },
        {
            key: "unitPrice",
            title: "Precio unitario",
            render: (item) =>
                new Intl.NumberFormat(
                    "es-CO",
                    {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                    }
                ).format(
                    item.unitPrice
                ),
        },
        {
            key: "subtotal",
            title: "Subtotal",
            render: (item) =>
                new Intl.NumberFormat(
                    "es-CO",
                    {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 2,
                    }
                ).format(
                    item.quantity *
                        item.unitPrice
                ),
        },
        {
            key: "actions",
            title: "Acciones",
            render: (item) => (
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        onRemove(
                            item.index
                        )
                    }
                >
                    <Trash2
                        size={16}
                    />
                    Eliminar
                </Button>
            ),
        },
    ];

    return (

        <Card>

            <h3>
                Productos agregados
            </h3>

            {rows.length === 0 ? (

                <EmptyState
                    title="No hay productos"
                    description="Agregue al menos un producto a la compra."
                />

            ) : (

                <Table<PurchaseProductRow>
                    columns={columns}
                    data={rows}
                />

            )}

        </Card>

    );

}
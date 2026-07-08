import { useEffect, useState } from "react";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import Spinner from "../../../../../shared/components/Spinner";
import Table from "../../../../../shared/components/Table";

import {
    deletePurchase,
    getPurchaseById,
    updatePurchase,
} from "../../services/purchaseService";

import { getAllSuppliers } from "../../../supplier/services/supplierService";

import PurchaseForm from "../../components/PurchaseForm";

import type { Purchase } from "../../types/Purchase";
import type { Supplier } from "../../../supplier/types/Supplier";
import type { PurchaseProduct } from "../../types/PurchaseProduct";
import type { TableColumn } from "../../../../../shared/components/Table/types";

import "./EditPurchasePage.css";

export default function EditPurchasePage() {

    const { purchaseId } = useParams();

    const navigate = useNavigate();

    const [purchase, setPurchase] = useState<Purchase | null>(null);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [supplierId, setSupplierId] = useState(0);

    const [paymentDate, setPaymentDate] = useState("");

    const [deliveryDate, setDeliveryDate] = useState("");

    const [state, setState] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadData();

    }, [purchaseId]);

    async function loadData() {

        if (!purchaseId) {

            return;

        }

        setLoading(true);

        setError("");

        try {

            const [
                purchaseResponse,
                suppliersResponse,
            ] = await Promise.all([
                getPurchaseById(Number(purchaseId)),
                getAllSuppliers(),
            ]);

            setPurchase(purchaseResponse);

            setSuppliers(suppliersResponse);

            setSupplierId(
                purchaseResponse.supplierId
            );

            setPaymentDate(
                purchaseResponse.paymentDate
            );

            setDeliveryDate(
                purchaseResponse.deliveryDate
            );

            setState(
                purchaseResponse.state
            );

        } catch {

            setError(
                "No fue posible cargar la compra."
            );

        } finally {

            setLoading(false);

        }

    }

    async function handleUpdatePurchase() {

        if (!purchase) {

            return;

        }

        try {

            const response =
                await updatePurchase(
                    purchase.id,
                    {
                        supplierId,
                        userId: purchase.userId,
                        paymentDate,
                        deliveryDate,
                        state,
                        totalCost:
                            purchase.totalCost,
                        products: [],
                    }
                );

            setPurchase(response);

            alert(
                "Compra actualizada correctamente."
            );

        } catch {

            alert(
                "No fue posible actualizar la compra."
            );

        }

    }

    async function handleDeletePurchase() {

        if (!purchase) {

            return;

        }

        const confirmed = window.confirm(
            "¿Está seguro de eliminar esta compra?"
        );

        if (!confirmed) {

            return;

        }

        try {

            await deletePurchase(
                purchase.id
            );

            alert(
                "Compra eliminada correctamente."
            );

            navigate("/purchases");

        } catch {

            alert(
                "No fue posible eliminar la compra."
            );

        }

    }

    const columns: TableColumn<PurchaseProduct>[] = [
        {
            key: "product",
            title: "Producto",
            render: (item) =>
                item.product.name,
        },
        {
            key: "quantity",
            title: "Cantidad",
        },
        {
            key: "unitPrice",
            title: "Precio Unitario",
            render: (item) =>
                `$${item.unitPrice.toLocaleString(
                    "es-CO"
                )}`,
        },
        {
            key: "subtotal",
            title: "Subtotal",
            render: (item) =>
                `$${item.subtotal.toLocaleString(
                    "es-CO"
                )}`,
        },
    ];

    if (loading) {

        return (
            <div className="edit-purchase-page__loading">
                <Spinner label="Cargando compra..." />
            </div>
        );

    }

    if (!purchase) {

        return null;

    }

    return (

        <div className="edit-purchase-page">

            <div className="edit-purchase-page__header">

                <div>

                    <h1 className="edit-purchase-page__title">
                        Editar Compra
                    </h1>

                    <p className="edit-purchase-page__subtitle">
                        Actualice la información de la compra.
                    </p>

                </div>

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

                <PurchaseForm
                    suppliers={suppliers}
                    supplierId={supplierId}
                    setSupplierId={setSupplierId}
                    paymentDate={paymentDate}
                    setPaymentDate={setPaymentDate}
                    deliveryDate={deliveryDate}
                    setDeliveryDate={setDeliveryDate}
                    state={state}
                    setState={setState}
                    readonlySupplier
                />

            </Card>

            <Card>

                <h2 className="edit-purchase-page__section-title">
                    Productos de la compra
                </h2>

                <Table<PurchaseProduct>
                    columns={columns}
                    data={purchase.purchaseProducts}
                />

            </Card>

            <Card>

                <div className="edit-purchase-page__summary">

                    <span>Total de la compra</span>

                    <strong>
                        $
                        {purchase.totalCost.toLocaleString(
                            "es-CO"
                        )}
                    </strong>

                </div>

            </Card>

            <div className="edit-purchase-page__actions">

                <Button
                    variant="primary"
                    onClick={
                        handleUpdatePurchase
                    }
                >
                    <Save size={18} />
                    Actualizar
                </Button>

                <Button
                    variant="danger"
                    onClick={
                        handleDeletePurchase
                    }
                >
                    <Trash2 size={18} />
                    Eliminar
                </Button>

                <Button
                    variant="secondary"
                    onClick={() =>
                        navigate("/purchases")
                    }
                >
                    <ArrowLeft size={18} />
                    Volver
                </Button>

            </div>

        </div>

    );

}
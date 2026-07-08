import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Save,
    Trash2,
} from "lucide-react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

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

import {
    getAllSuppliers,
} from "../../../supplier/services/supplierService";

import {
    getAllProducts,
} from "../../../../inventory/product/services/productService";

import PurchaseForm from "../../components/PurchaseForm";

import type { Purchase } from "../../types/Purchase";
import type { PurchaseProduct } from "../../types/PurchaseProduct";
import type { Supplier } from "../../../supplier/types/Supplier";
import type { Product } from "../../../../inventory/product/types/Product";

import type { TableColumn } from "../../../../../shared/components/Table/types";

import "./EditPurchasePage.css";

export default function EditPurchasePage() {

    function normalizePurchaseState(state: string) {

        switch (state.toUpperCase()) {

            case "PENDING":
                return "PENDIENTE";

            case "RECEIVED":
                return "RECIBIDO";

            case "PAID":
                return "PAGADO";

            case "CANCELLED":
                return "CANCELADO";

            default:
                return state;

        }

    }

    const { purchaseId } = useParams();

    const navigate = useNavigate();

    const [purchase, setPurchase] =
        useState<Purchase | null>(null);

    const [purchaseProducts, setPurchaseProducts] =
        useState<PurchaseProduct[]>([]);

    const [suppliers, setSuppliers] =
        useState<Supplier[]>([]);

    const [products, setProducts] =
        useState<Product[]>([]);

    const [supplierId, setSupplierId] =
        useState(0);

    const [paymentDate, setPaymentDate] =
        useState("");

    const [deliveryDate, setDeliveryDate] =
        useState("");

    const [state, setState] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

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

                productsResponse,

            ] = await Promise.all([

                getPurchaseById(
                    Number(purchaseId)
                ),

                getAllSuppliers(),

                getAllProducts(),

            ]);

            setPurchase(
                purchaseResponse
            );

            setSuppliers(
                suppliersResponse
            );

            setProducts(
                productsResponse
            );

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
                normalizePurchaseState(
                    purchaseResponse.state
                )
            );

            setPurchaseProducts(
                purchaseResponse.purchaseProducts
            );

        } catch {

            setError(
                "No fue posible cargar la compra."
            );

        } finally {

            setLoading(false);

        }

    }

    function getProductName(
        productId: number
    ) {

        const product =
            products.find(
                (item) =>
                    item.id === productId
            );

        return product
            ? product.name
            : `#${productId}`;

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

                        products:
                            purchaseProducts.map(
                                (item) => ({
                                    productId:
                                        item.productId,
                                    quantity:
                                        item.quantity,
                                    unitPrice:
                                        item.unitPrice,
                                })
                            ),

                    }
                );

            setPurchase(response);

            const normalizedState =
                normalizePurchaseState(
                    response.state
                );

            setState(normalizedState);

            if (response.purchaseProducts) {
                setPurchaseProducts(
                    response.purchaseProducts
                );
            }

            alert(
                "Compra actualizada correctamente."
            );

        } catch (error) {

            console.error(error);

            alert(
                "No fue posible actualizar la compra."
            );

        }

}

    async function handleDeletePurchase() {

        if (!purchase) {

            return;

        }

        const confirmed =
            window.confirm(
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
                    }
                ).format(
                    item.subtotal
                ),
        },

    ];

    if (loading) {

        return (

            <div className="edit-purchase-page__loading">

                <Spinner
                    label="Cargando compra..."
                />

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
                        Editar compra
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
                    onClose={() =>
                        setError("")
                    }
                >
                    {error}
                </Alert>

            )}

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

            <Card>

                <h2 className="edit-purchase-page__section-title">
                    Productos de la compra
                </h2>

                <Table<PurchaseProduct>
                    columns={columns}
                    data={
                        purchaseProducts
                    }
                />

            </Card>

            <Card>

                <div className="edit-purchase-page__summary">

                    <span>
                        Total de la compra
                    </span>

                    <strong>

                        {new Intl.NumberFormat(
                            "es-CO",
                            {
                                style: "currency",
                                currency: "COP",
                            }
                        ).format(
                            purchase.totalCost
                        )}

                    </strong>

                </div>

            </Card>

            <div className="edit-purchase-page__actions">

                <Button
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
                        navigate(
                            "/purchases"
                        )
                    }
                >
                    <ArrowLeft size={18} />
                    Volver
                </Button>

            </div>

        </div>

    );

}
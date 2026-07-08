import {
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    ArrowLeft,
    ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import Spinner from "../../../../../shared/components/Spinner";

import {
    createPurchase,
} from "../../services/purchaseService";

import {
    getAllProducts,
} from "../../../../inventory/product/services/productService";

import {
    getAllSuppliers,
} from "../../../supplier/services/supplierService";

import {
    getCurrentUser,
} from "../../../../../shared/utils/sessionManager";

import PurchaseForm from "../../components/PurchaseForm";
import ProductSelector from "../../components/ProductSelector";
import PurchaseProductsTable from "../../components/PurchaseProductsTable";

import type { Product } from "../../../../inventory/product/types/Product";
import type { Supplier } from "../../../supplier/types/Supplier";
import type { PurchaseProductRequest } from "../../types/PurchaseProductRequest";

import "./CreatePurchasePage.css";

export default function CreatePurchasePage() {

    const navigate = useNavigate();

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

    const [
        purchaseProducts,
        setPurchaseProducts,
    ] = useState<
        PurchaseProductRequest[]
    >([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        loadInitialData();

    }, []);

    async function loadInitialData() {

        setLoading(true);

        setError("");

        try {

            const [
                suppliersResponse,
                productsResponse,
            ] = await Promise.all([
                getAllSuppliers(),
                getAllProducts(),
            ]);

            setSuppliers(
                suppliersResponse
            );

            setProducts(
                productsResponse
            );

        } catch {

            setError(
                "No fue posible cargar la información."
            );

        } finally {

            setLoading(false);

        }

    }

    function handleAddProduct(
        product: PurchaseProductRequest
    ) {

        setPurchaseProducts(
            (previous) => {

                const existing =
                    previous.find(
                        (item) =>
                            item.productId ===
                            product.productId
                    );

                if (existing) {

                    return previous.map(
                        (item) =>

                            item.productId ===
                            product.productId
                                ? {
                                      ...item,
                                      quantity:
                                          item.quantity +
                                          product.quantity,
                                  }
                                : item
                    );

                }

                return [
                    ...previous,
                    product,
                ];

            }
        );

    }

    function handleRemoveProduct(
        index: number
    ) {

        setPurchaseProducts(
            (previous) =>
                previous.filter(
                    (_, i) =>
                        i !== index
                )
        );

    }

    const totalCost =
        useMemo(() => {

            return purchaseProducts.reduce(

                (
                    total,
                    product
                ) =>

                    total +
                    product.quantity *
                        product.unitPrice,

                0

            );

        }, [purchaseProducts]);

    async function handleCreatePurchase() {

        const user =
            getCurrentUser();

        if (!user) {

            alert(
                "No existe un usuario autenticado."
            );

            return;

        }

        if (purchaseProducts.length === 0) {

            alert(
                "Debe agregar al menos un producto."
            );

            return;

        }

        try {

            await createPurchase({

                supplierId,

                userId: user.id,

                paymentDate,

                deliveryDate,

                state: "PENDIENTE",

                totalCost,

                products:
                    purchaseProducts,

            });

            alert(
                "Compra registrada correctamente."
            );

            navigate(
                "/purchases"
            );

        } catch {

            alert(
                "No fue posible registrar la compra."
            );

        }

    }

    if (loading) {

        return (

            <div className="create-purchase-page__loading">

                <Spinner
                    label="Cargando información..."
                />

            </div>

        );

    }

    return (

        <div className="create-purchase-page">

            <div className="create-purchase-page__header">

                <div>

                    <h1 className="create-purchase-page__title">
                        Nueva compra
                    </h1>

                    <p className="create-purchase-page__subtitle">
                        Registre una nueva orden de compra.
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
                showState={false}
            />

            <ProductSelector
                supplierId={supplierId}
                products={products}
                onAddProduct={
                    handleAddProduct
                }
            />

            <PurchaseProductsTable
                items={purchaseProducts}
                products={products}
                onRemove={
                    handleRemoveProduct
                }
            />

            <Card>

                <div className="create-purchase-page__summary">

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
                            totalCost
                        )}

                    </strong>

                </div>

            </Card>

            <div className="create-purchase-page__actions">

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

                <Button
                    onClick={
                        handleCreatePurchase
                    }
                >
                    <ShoppingCart size={18} />
                    Registrar compra
                </Button>

            </div>

        </div>

    );

}
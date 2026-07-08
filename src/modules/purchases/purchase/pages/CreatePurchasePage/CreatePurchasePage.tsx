import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPurchase } from "../../services/purchaseService";

import { getAllProducts } from "../../../../inventory/product/services/productService";
import { getAllSuppliers } from "../../../supplier/services/supplierService";

import { getCurrentUser } from "../../../../../shared/utils/sessionManager";

import PurchaseForm from "../../components/PurchaseForm";
import ProductSelector from "../../components/ProductSelector";
import PurchaseProductsTable from "../../components/PurchaseProductsTable";

import type { Product } from "../../../../inventory/product/types/Product";
import type { Supplier } from "../../../supplier/types/Supplier";
import type { PurchaseProductRequest } from "../../types/PurchaseProductRequest";

export default function CreatePurchasePage() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [products, setProducts] = useState<Product[]>([]);

    const [supplierId, setSupplierId] = useState(0);

    const [paymentDate, setPaymentDate] = useState("");

    const [deliveryDate, setDeliveryDate] = useState("");

    const [state, setState] = useState("PENDING");

    const [purchaseProducts, setPurchaseProducts] = useState<
        PurchaseProductRequest[]
    >([]);

    useEffect(() => {

        loadInitialData();

    }, []);

    async function loadInitialData() {

        try {

            const [suppliersResponse, productsResponse] =
                await Promise.all([
                    getAllSuppliers(),
                    getAllProducts(),
                ]);

            setSuppliers(suppliersResponse);

            setProducts(productsResponse);

        } catch (error) {

            console.error(error);

            alert("No fue posible cargar la información.");

        }

    }

function handleAddProduct(product: PurchaseProductRequest) {

    setPurchaseProducts((previous) => {

        const existingProduct = previous.find(
            (item) => item.productId === product.productId
        );

        if (existingProduct) {

            return previous.map((item) =>

                item.productId === product.productId
                    ? {
                        ...item,
                        quantity: item.quantity + product.quantity,
                    }
                    : item

            );

        }

        return [

            ...previous,

            product,

        ];

    });

}

    function handleRemoveProduct(index: number) {

        setPurchaseProducts((previous) =>
            previous.filter((_, i) => i !== index)
        );

    }

    const totalCost = useMemo(() => {

        return purchaseProducts.reduce(

            (total, product) =>

                total + product.quantity * product.unitPrice,

            0

        );

    }, [purchaseProducts]);

    async function handleCreatePurchase() {

        const user = getCurrentUser();

        if (!user) {

            alert("No existe un usuario autenticado.");

            return;

        }

        if (purchaseProducts.length === 0) {

            alert("Debe agregar al menos un producto.");

            return;

        }

        try {

            await createPurchase({

                supplierId,

                userId: user.id,

                paymentDate,

                deliveryDate,

                state,

                totalCost,

                products: purchaseProducts,

            });

            alert("Compra registrada correctamente.");

            navigate("/purchases");

        } catch (error) {

            console.error(error);

            alert("No fue posible registrar la compra.");

        }

    }

    return (

        <div>

            <h1>Nueva Compra</h1>

            <hr />

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

            />

            <br />

            <ProductSelector

                supplierId={supplierId}

                products={products}

                onAddProduct={handleAddProduct}

            />

            <br />

            <PurchaseProductsTable

                items={purchaseProducts}

                products={products}

                onRemove={handleRemoveProduct}

            />

            <br />

            <h3>Total: ${totalCost}</h3>

            <button onClick={handleCreatePurchase}>
                Registrar Compra
            </button>

            <button
                onClick={() => navigate("/purchases")}
            >
                Volver
            </button>

        </div>

    );

}
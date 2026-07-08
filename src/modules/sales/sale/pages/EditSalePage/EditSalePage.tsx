import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Spinner from "../../../../../shared/components/Spinner";

import { getAllProducts } from "../../../../inventory/product/services/productService";
import { getSaleById, updateSale } from "../../services/saleService";

import type { Product } from "../../../../inventory/product/types/Product";
import type { Sale } from "../../types/Sale";
import type { SaleProductRequest } from "../../types/SaleProductRequest";

import SaleForm from "../../components/SaleForm";
import SaleProductsTable from "../../components/SaleProductsTable";

export default function EditSalePage() {

    const { saleId } = useParams();

    const navigate = useNavigate();

    const [sale, setSale] = useState<Sale | null>(null);

    const [products, setProducts] = useState<Product[]>([]);

    const [customerId, setCustomerId] = useState(0);

    const [customerName, setCustomerName] = useState("");

    const [customerAddress, setCustomerAddress] = useState("");

    const [description, setDescription] = useState("");

    const [deliveryDate, setDeliveryDate] = useState("");

    const [status, setStatus] = useState("");

    const [saleProducts, setSaleProducts] = useState<SaleProductRequest[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadData();

    }, [saleId]);

    async function loadData() {

        if (!saleId) {

            return;

        }

        setLoading(true);

        setError("");

        try {

            const [saleResponse, productsResponse] = await Promise.all([
                getSaleById(Number(saleId)),
                getAllProducts(),
            ]);

            setSale(saleResponse);

            setProducts(productsResponse);

            setCustomerId(saleResponse.customerId);

            setCustomerName(saleResponse.customerName);

            setCustomerAddress(saleResponse.customerAddress);

            setDescription(saleResponse.description);

            setDeliveryDate(saleResponse.deliveryDate);

            setStatus(saleResponse.status);

            setSaleProducts(
                (saleResponse.saleProducts ?? saleResponse.products ?? []).map(
                    (item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                    })
                )
            );

        } catch {

            setError("No fue posible cargar la venta.");

        } finally {

            setLoading(false);

        }

    }

    const totalCost = useMemo(() => {

        return saleProducts.reduce(

            (total, product) => total + product.quantity * product.unitPrice,
            0

        );

    }, [saleProducts]);

    async function handleUpdateSale() {

        if (!sale) {

            return;

        }

        try {

            const response = await updateSale(sale.id, {

                deliveryDate,

                description,

                status,

            });

            setSale(response);

            setDeliveryDate(response.deliveryDate);

            setDescription(response.description);

            setStatus(response.status);

            alert("Venta actualizada correctamente.");

        } catch (error) {

            console.error(error);

            alert("No fue posible actualizar la venta.");

        }

    }

    if (loading) {

        return (

            <div className="edit-purchase-page__loading">

                <Spinner label="Cargando venta..." />

            </div>

        );

    }

    if (!sale) {

        return null;

    }

    return (

        <div className="edit-purchase-page">

            <div className="edit-purchase-page__header">

                <div>

                    <h1 className="edit-purchase-page__title">Editar venta</h1>

                    <p className="edit-purchase-page__subtitle">
                        Actualice la información de la venta.
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

            <SaleForm
                customers={[]}
                customerId={customerId}
                setCustomerId={setCustomerId}
                customerName={customerName}
                customerAddress={customerAddress}
                description={description}
                setDescription={setDescription}
                deliveryDate={deliveryDate}
                setDeliveryDate={setDeliveryDate}
                status={status}
                setStatus={setStatus}
                readonlyCustomer
            />

            <SaleProductsTable
                items={saleProducts}
                products={products}
            />

            <div className="edit-purchase-page__summary">

                <span>Total de la venta</span>

                <strong>
                    {new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                    }).format(totalCost)}
                </strong>

            </div>

            <div className="edit-purchase-page__actions">

                <Button onClick={handleUpdateSale}>
                    <Save size={18} />
                    Actualizar
                </Button>

                <Button
                    variant="secondary"
                    onClick={() => navigate("/sales")}
                >
                    <ArrowLeft size={18} />
                    Volver
                </Button>

            </div>

        </div>

    );

}
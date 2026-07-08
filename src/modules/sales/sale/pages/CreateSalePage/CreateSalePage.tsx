import {
    useEffect,
    useMemo,
    useState,
} from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Spinner from "../../../../../shared/components/Spinner";

import { getCurrentUser } from "../../../../../shared/utils/sessionManager";

import { getAllCustomers } from "../../../customer/services/customerService";
import { getAllProducts } from "../../../../inventory/product/services/productService";
import { createSale } from "../../services/saleService";

import type { Customer } from "../../../customer/types/Customer";
import type { Product } from "../../../../inventory/product/types/Product";
import type { SaleProductRequest } from "../../types/SaleProductRequest";

import SaleForm from "../../components/SaleForm";
import SaleProductSelector from "../../components/SaleProductSelector";
import SaleProductsTable from "../../components/SaleProductsTable";

export default function CreateSalePage() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState<Customer[]>([]);

    const [products, setProducts] = useState<Product[]>([]);

    const [customerId, setCustomerId] = useState(0);

    const [customerName, setCustomerName] = useState("");

    const [customerAddress, setCustomerAddress] = useState("");

    const [description, setDescription] = useState("");

    const [deliveryDate, setDeliveryDate] = useState("");

    const [saleProducts, setSaleProducts] = useState<SaleProductRequest[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadInitialData();

    }, []);

    useEffect(() => {

        const customer = customers.find((item) => item.id === customerId);

        setCustomerName(customer?.name ?? "");

        setCustomerAddress(customer?.address ?? "");

    }, [customerId, customers]);

    async function loadInitialData() {

        setLoading(true);

        setError("");

        try {

            const [customersResponse, productsResponse] = await Promise.all([
                getAllCustomers(),
                getAllProducts(),
            ]);

            setCustomers(customersResponse);

            setProducts(productsResponse);

        } catch {

            setError("No fue posible cargar la información.");

        } finally {

            setLoading(false);

        }

    }

    function handleAddProduct(product: SaleProductRequest) {

        setSaleProducts((previous) => {

            const existing = previous.find((item) => item.productId === product.productId);

            if (existing) {

                return previous.map((item) =>

                    item.productId === product.productId
                        ? {
                              ...item,
                              quantity: item.quantity + product.quantity,
                          }
                        : item
                );

            }

            return [...previous, product];

        });

    }

    function handleRemoveProduct(index: number) {

        setSaleProducts((previous) => previous.filter((_, i) => i !== index));

    }

    const totalCost = useMemo(() => {

        return saleProducts.reduce(

            (total, product) => total + product.quantity * product.unitPrice,
            0

        );

    }, [saleProducts]);

    async function handleCreateSale() {

        const user = getCurrentUser();

        if (!user) {

            alert("No existe un usuario autenticado.");

            return;

        }

        if (!customerId) {

            alert("Debe seleccionar un cliente.");

            return;

        }

        if (saleProducts.length === 0) {

            alert("Debe agregar al menos un producto.");

            return;

        }

        try {

            await createSale({

                customerId,

                userId: user.id,

                customerName,

                customerAddress,

                description,

                deliveryDate,

                products: saleProducts,

            });

            alert("Venta registrada correctamente.");

            navigate("/sales");

        } catch (error) {

            console.error(error);

            alert("No fue posible registrar la venta.");

        }

    }

    if (loading) {

        return (

            <div className="create-purchase-page__loading">

                <Spinner label="Cargando información..." />

            </div>

        );

    }

    return (

        <div className="create-purchase-page">

            <div className="create-purchase-page__header">

                <div>

                    <h1 className="create-purchase-page__title">Nueva venta</h1>

                    <p className="create-purchase-page__subtitle">
                        Registre una nueva venta.
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
                customers={customers}
                customerId={customerId}
                setCustomerId={setCustomerId}
                customerName={customerName}
                customerAddress={customerAddress}
                description={description}
                setDescription={setDescription}
                deliveryDate={deliveryDate}
                setDeliveryDate={setDeliveryDate}
                showStatus={false}
            />

            <SaleProductSelector
                products={products}
                onAddProduct={handleAddProduct}
            />

            <SaleProductsTable
                items={saleProducts}
                products={products}
                onRemove={handleRemoveProduct}
            />

            <div className="create-purchase-page__actions">

                <Button variant="secondary" onClick={() => navigate("/sales")}>
                    <ArrowLeft size={18} />
                    Volver
                </Button>

                <Button onClick={handleCreateSale}>
                    <ShoppingCart size={18} />
                    Registrar venta
                </Button>

            </div>

            <div className="create-purchase-page__summary" style={{ marginTop: 16 }}>

                <span>Total de la venta</span>

                <strong>
                    {new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                    }).format(totalCost)}
                </strong>

            </div>

        </div>

    );

}
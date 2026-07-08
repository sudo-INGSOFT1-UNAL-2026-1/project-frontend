import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    deletePurchase,
    getPurchaseById,
    updatePurchase,
} from "../../services/purchaseService";

import { getAllSuppliers } from "../../../supplier/services/supplierService";

import PurchaseForm from "../../components/PurchaseForm";

import type { Purchase } from "../../types/Purchase";
import type { Supplier } from "../../../supplier/types/Supplier";

export default function EditPurchasePage() {

    const { purchaseId } = useParams();

    const navigate = useNavigate();

    const [purchase, setPurchase] = useState<Purchase | null>(null);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [supplierId, setSupplierId] = useState(0);

    const [paymentDate, setPaymentDate] = useState("");

    const [deliveryDate, setDeliveryDate] = useState("");

    const [state, setState] = useState("");

    useEffect(() => {

        loadData();

    }, [purchaseId]);

    async function loadData() {

        if (!purchaseId) {

            return;

        }

        try {

            const [purchaseResponse, suppliersResponse] =
                await Promise.all([

                    getPurchaseById(Number(purchaseId)),

                    getAllSuppliers(),

                ]);

            setPurchase(purchaseResponse);

            setSuppliers(suppliersResponse);

            setSupplierId(purchaseResponse.supplierId);

            setPaymentDate(purchaseResponse.paymentDate);

            setDeliveryDate(purchaseResponse.deliveryDate);

            setState(purchaseResponse.state);

        } catch (error) {

            console.error(error);

            alert("No fue posible cargar la compra.");

        }

    }

    async function handleUpdatePurchase() {

        if (!purchase) {

            return;

        }

        try {

            const response = await updatePurchase(

                purchase.id,

                {

                    supplierId,

                    userId: purchase.userId,

                    paymentDate,

                    deliveryDate,

                    state,

                    totalCost: purchase.totalCost,

                    products: [],

                }

            );

            setPurchase(response);

            alert("Compra actualizada correctamente.");

        } catch (error) {

            console.error(error);

            alert("No fue posible actualizar la compra.");

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

            await deletePurchase(purchase.id);

            alert("Compra eliminada correctamente.");

            navigate("/purchases");

        } catch (error) {

            console.error(error);

            alert("No fue posible eliminar la compra.");

        }

    }

    if (!purchase) {

        return <p>Cargando...</p>;

    }

    return (

        <div>

            <h1>Editar Compra</h1>

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

                readonlySupplier={true}

            />
            <br />

            <h2>Productos</h2>

            <table>

                <thead>

                    <tr>

                        <th>Producto</th>

                        <th>Cantidad</th>

                        <th>Precio Unitario</th>

                        <th>Subtotal</th>

                    </tr>

                </thead>

                <tbody>

                    {purchase.purchaseProducts.map((item) => (

                        <tr key={item.id}>

                            <td>

                                {item.product.name}

                            </td>

                            <td>

                                {item.quantity}

                            </td>

                            <td>

                                ${item.unitPrice}

                            </td>

                            <td>

                                ${item.subtotal}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <br />

            <h3>

                Total: ${purchase.totalCost}

            </h3>

            <br />

            <button
                onClick={handleUpdatePurchase}
            >
                Actualizar
            </button>

            <button
                onClick={handleDeletePurchase}
            >
                Eliminar
            </button>

            <button
                onClick={() =>
                    navigate("/purchases")
                }
            >
                Volver
            </button>

        </div>

    );

}
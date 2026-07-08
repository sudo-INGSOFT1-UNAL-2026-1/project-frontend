import type { Supplier } from "../../supplier/types/Supplier";

interface PurchaseFormProps {

    suppliers: Supplier[];

    supplierId: number;

    setSupplierId: (supplierId: number) => void;

    paymentDate: string;

    setPaymentDate: (paymentDate: string) => void;

    deliveryDate: string;

    setDeliveryDate: (deliveryDate: string) => void;

    state: string;

    setState: (state: string) => void;

    readonlySupplier?: boolean;

}

export default function PurchaseForm({

    suppliers,

    supplierId,

    setSupplierId,

    paymentDate,

    setPaymentDate,

    deliveryDate,

    setDeliveryDate,

    state,

    setState,

    readonlySupplier = false,

}: PurchaseFormProps) {

    return (

        <div>

            <div>

                <label>Proveedor</label>

                <br />

                <select
                    value={supplierId}
                    disabled={readonlySupplier}
                    onChange={(e) =>
                        setSupplierId(Number(e.target.value))
                    }
                >

                    <option value={0}>
                        Seleccione un proveedor
                    </option>

                    {suppliers.map((supplier) => (

                        <option
                            key={supplier.id}
                            value={supplier.id}
                        >
                            {supplier.name}
                        </option>

                    ))}

                </select>

            </div>

            <br />

            <div>

                <label>Fecha de pago</label>

                <br />

                <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) =>
                        setPaymentDate(e.target.value)
                    }
                />

            </div>

            <br />

            <div>

                <label>Fecha de entrega</label>

                <br />

                <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) =>
                        setDeliveryDate(e.target.value)
                    }
                />

            </div>

            <br />

            <div>

                <label>Estado</label>

                <br />

                <select
                    value={state}
                    onChange={(e) =>
                        setState(e.target.value)
                    }
                >

                    <option value="PENDING">
                        Pendiente
                    </option>

                    <option value="COMPLETED">
                        Completada
                    </option>

                    <option value="CANCELLED">
                        Cancelada
                    </option>

                </select>

            </div>

        </div>

    );

}
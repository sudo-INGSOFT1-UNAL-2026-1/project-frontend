import Card from "../../../../shared/components/Card";
import Input from "../../../../shared/components/Input";
import Select from "../../../../shared/components/Select";

import type { Supplier } from "../../supplier/types/Supplier";

interface PurchaseFormProps {

    suppliers: Supplier[];

    supplierId: number;

    setSupplierId: (supplierId: number) => void;

    paymentDate: string;

    setPaymentDate: (paymentDate: string) => void;

    deliveryDate: string;

    setDeliveryDate: (deliveryDate: string) => void;

    state?: string;

    setState?: (state: string) => void;

    readonlySupplier?: boolean;

    showState?: boolean;

}

export default function PurchaseForm({

    suppliers,

    supplierId,

    setSupplierId,

    paymentDate,

    setPaymentDate,

    deliveryDate,

    setDeliveryDate,

    state = "PENDIENTE",

    setState,

    readonlySupplier = false,

    showState = true,

}: PurchaseFormProps) {

    return (

        <Card>

            <div className="purchase-form">

                <Select
                    label="Proveedor"
                    value={
                        supplierId === 0
                            ? ""
                            : String(supplierId)
                    }
                    placeholder="Seleccione un proveedor"
                    disabled={readonlySupplier}
                    options={suppliers.map((supplier) => ({
                        value: String(supplier.id),
                        label: supplier.name,
                    }))}
                    onChange={(event) =>
                        setSupplierId(
                            Number(event.target.value)
                        )
                    }
                />

                <Input
                    label="Fecha de pago"
                    type="date"
                    value={paymentDate}
                    onChange={(event) =>
                        setPaymentDate(
                            event.target.value
                        )
                    }
                />

                <Input
                    label="Fecha de entrega"
                    type="date"
                    value={deliveryDate}
                    onChange={(event) =>
                        setDeliveryDate(
                            event.target.value
                        )
                    }
                />

                {showState && (

                    <Select
                        label="Estado"
                        value={state}
                        options={[
                            {
                                value: "PENDIENTE",
                                label: "Pendiente",
                            },
                            {
                                value: "RECIBIDO",
                                label: "Recibido",
                            },
                            {
                                value: "PAGADO",
                                label: "Pagado",
                            },
                            {
                                value: "CANCELADO",
                                label: "Cancelado",
                            },
                        ]}
                        onChange={(event) =>
                            setState?.(
                                event.target.value
                            )
                        }
                    />

                )}

            </div>

        </Card>

    );

}
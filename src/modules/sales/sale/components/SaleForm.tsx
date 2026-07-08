import Card from "../../../../shared/components/Card";
import Input from "../../../../shared/components/Input";
import Select from "../../../../shared/components/Select";
import Textarea from "../../../../shared/components/Textarea";

import type { Customer } from "../../customer/types/Customer";

interface SaleFormProps {

    customers: Customer[];

    customerId: number;

    setCustomerId: (customerId: number) => void;

    customerName: string;

    customerAddress: string;

    description: string;

    setDescription: (description: string) => void;

    deliveryDate: string;

    setDeliveryDate: (deliveryDate: string) => void;

    status?: string;

    setStatus?: (status: string) => void;

    readonlyCustomer?: boolean;

    showStatus?: boolean;

}

export default function SaleForm({

    customers,

    customerId,

    setCustomerId,

    customerName,

    customerAddress,

    description,

    setDescription,

    deliveryDate,

    setDeliveryDate,

    status = "PENDING",

    setStatus,

    readonlyCustomer = false,

    showStatus = true,

}: SaleFormProps) {

    return (

        <Card>

            <div className="purchase-form">

                <Select
                    label="Cliente"
                    value={customerId === 0 ? "" : String(customerId)}
                    placeholder="Seleccione un cliente"
                    disabled={readonlyCustomer}
                    options={customers.map((customer) => ({
                        value: String(customer.id),
                        label: customer.name,
                    }))}
                    onChange={(event) =>
                        setCustomerId(Number(event.target.value))
                    }
                />

                <Input
                    label="Nombre del cliente"
                    value={customerName}
                    disabled
                />

                <Input
                    label="Dirección del cliente"
                    value={customerAddress}
                    disabled
                />

                <Textarea
                    label="Descripción"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />

                <Input
                    label="Fecha de entrega"
                    type="date"
                    value={deliveryDate}
                    onChange={(event) =>
                        setDeliveryDate(event.target.value)
                    }
                />

                {showStatus && (

                    <Select
                        label="Estado"
                        value={status}
                        placeholder="Seleccione un estado"
                        options={[
                            {
                                value: "entregado",
                                label: "Entregado",
                            },
                            {
                                value: "por_enviar",
                                label: "Por enviar",
                            },
                            {
                                value: "en_camino",
                                label: "En camino",
                            },
                            {
                                value: "cancelado",
                                label: "Cancelado",
                            },
                        ]}
                        onChange={(event) =>
                            setStatus?.(event.target.value)
                        }
                    />

                )}

            </div>

        </Card>

    );

}
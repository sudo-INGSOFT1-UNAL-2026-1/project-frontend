import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Pencil,
    Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import Input from "../../../../../shared/components/Input";
import Spinner from "../../../../../shared/components/Spinner";
import Toast from "../../../../../shared/components/Toast";

import {
    deleteCustomer,
    getCustomerById,
    updateCustomer,
} from "../../services/customerService";

import type { Customer } from "../../types/Customer";

import "./EditCustomerPage.css";

export default function EditCustomerPage() {

    const { customerId } = useParams();

    const navigate = useNavigate();

    const [customer, setCustomer] =
        useState<Customer | null>(null);

    const [name, setName] =
        useState("");

    const [address, setAddress] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [toastOpen, setToastOpen] =
        useState(false);

    const [toastMessage, setToastMessage] =
        useState("");

    const [toastVariant, setToastVariant] =
        useState<"success" | "danger">(
            "success"
        );

    useEffect(() => {

        loadCustomer();

    }, [customerId]);

    async function loadCustomer() {

        if (!customerId) {
            return;
        }

        setLoading(true);

        setError("");

        try {

            const response =
                await getCustomerById(
                    Number(customerId)
                );

            setCustomer(response);

            setName(response.name);

            setAddress(response.address);

        } catch {

            setError(
                "No fue posible cargar el cliente."
            );

        } finally {

            setLoading(false);

        }

    }

    async function handleUpdateCustomer() {

        if (!customer) {
            return;
        }

        try {

            const response =
                await updateCustomer(
                    customer.id,
                    {
                        name,
                        address,
                    }
                );

            setCustomer(response);

            setToastVariant(
                "success"
            );

            setToastMessage(
                "Cliente actualizado correctamente."
            );

            setToastOpen(true);

        } catch {

            setToastVariant(
                "danger"
            );

            setToastMessage(
                "No fue posible actualizar el cliente."
            );

            setToastOpen(true);

        }

    }

    async function handleDeleteCustomer() {

        if (!customer) {
            return;
        }

        const confirmed =
            window.confirm(
                "¿Está seguro de que desea eliminar este cliente?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteCustomer(
                customer.id
            );

            setToastVariant(
                "success"
            );

            setToastMessage(
                "Cliente eliminado correctamente."
            );

            setToastOpen(true);

            setTimeout(() => {

                navigate(
                    "/sales/customers"
                );

            }, 1000);

        } catch {

            setToastVariant(
                "danger"
            );

            setToastMessage(
                "No fue posible eliminar el cliente."
            );

            setToastOpen(true);

        }

    }

    if (loading) {

        return (

            <div className="edit-customer-page__loading">

                <Spinner
                    label="Cargando cliente..."
                />

            </div>

        );

    }

    return (

        <div className="edit-customer-page">

            <div className="edit-customer-page__header">

                <div>

                    <h1 className="edit-customer-page__title">
                        Editar cliente
                    </h1>

                    <p className="edit-customer-page__subtitle">
                        Actualice la información del cliente.
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

            {customer && (

                <Card>

                    <div className="edit-customer-page__form">

                        <Input
                            label="Nombre"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                        />

                        <Input
                            label="Dirección"
                            value={address}
                            onChange={(event) =>
                                setAddress(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    <div className="edit-customer-page__actions">

                        <Button
                            variant="danger"
                            onClick={
                                handleDeleteCustomer
                            }
                        >
                            <Trash2 size={18} />
                            Eliminar
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() =>
                                navigate(
                                    "/sales/customers"
                                )
                            }
                        >
                            <ArrowLeft size={18} />
                            Volver
                        </Button>

                        <Button
                            onClick={
                                handleUpdateCustomer
                            }
                        >
                            <Pencil size={18} />
                            Guardar cambios
                        </Button>

                    </div>

                </Card>

            )}

            <Toast
                open={toastOpen}
                variant={toastVariant}
                message={toastMessage}
                onClose={() =>
                    setToastOpen(false)
                }
            />

        </div>

    );

}


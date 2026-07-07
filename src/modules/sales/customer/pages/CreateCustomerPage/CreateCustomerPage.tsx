import { useState } from "react";
import {
    ArrowLeft,
    Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import Input from "../../../../../shared/components/Input";
import Toast from "../../../../../shared/components/Toast";

import { createCustomer } from "../../services/customerService";

import "./CreateCustomerPage.css";

export default function CreateCustomerPage() {

    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [address, setAddress] =
        useState("");

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

    async function handleCreateCustomer() {

        setError("");

        try {

            await createCustomer({
                name,
                address,
            });

            setToastVariant(
                "success"
            );

            setToastMessage(
                "Cliente creado correctamente."
            );

            setToastOpen(true);

            setTimeout(() => {
                navigate("/sales/customers");
            }, 1000);

        } catch {

            setToastVariant(
                "danger"
            );

            setToastMessage(
                "No fue posible crear el cliente."
            );

            setToastOpen(true);

            setError(
                "Ocurrió un error al crear el cliente."
            );

        }

    }

    return (

        <div className="create-customer-page">

            <div className="create-customer-page__header">

                <div>

                    <h1 className="create-customer-page__title">
                        Crear cliente
                    </h1>

                    <p className="create-customer-page__subtitle">
                        Registre un nuevo cliente en el sistema.
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

            <Card>

                <div className="create-customer-page__form">

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

                <div className="create-customer-page__actions">

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
                            handleCreateCustomer
                        }
                    >
                        <Save size={18} />
                        Crear cliente
                    </Button>

                </div>

            </Card>

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
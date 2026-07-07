import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import Input from "../../../../../shared/components/Input";
import Toast from "../../../../../shared/components/Toast";

import { createSupplier } from "../../services/supplierService";

import "./CreateSupplierPage.css";

export default function CreateSupplierPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [phone, setPhone] = useState("");

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [toastOpen, setToastOpen] = useState(false);

    async function handleCreateSupplier() {

        setLoading(true);
        setError("");

        try {

            await createSupplier({
                name,
                phone,
                email,
            });

            setToastOpen(true);

            setTimeout(() => {

                navigate(
                    "/purchases/suppliers"
                );

            }, 1200);

        } catch {

            setError(
                "No fue posible crear el proveedor."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="create-supplier-page">

            <Toast
                open={toastOpen}
                variant="success"
                message="Proveedor creado correctamente."
                onClose={() => setToastOpen(false)}
            />

            <div className="create-supplier-page__header">

                <div>

                    <h1 className="create-supplier-page__title">
                        Crear proveedor
                    </h1>

                    <p className="create-supplier-page__subtitle">
                        Registre un nuevo proveedor en el sistema.
                    </p>

                </div>

                <Button
                    variant="secondary"
                    onClick={() =>
                        navigate(
                            "/purchases/suppliers"
                        )
                    }
                >
                    <ArrowLeft size={18} />
                    Volver
                </Button>

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

            <Card>

                <div className="create-supplier-page__form">

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
                        label="Teléfono"
                        value={phone}
                        onChange={(event) =>
                            setPhone(
                                event.target.value
                            )
                        }
                    />

                    <Input
                        type="email"
                        label="Correo electrónico"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                    />

                    <div className="create-supplier-page__actions">

                        <Button
                            variant="secondary"
                            onClick={() =>
                                navigate(
                                    "/purchases/suppliers"
                                )
                            }
                        >
                            Cancelar
                        </Button>

                        <Button
                            loading={loading}
                            onClick={
                                handleCreateSupplier
                            }
                        >
                            <Save size={18} />
                            Guardar proveedor
                        </Button>

                    </div>

                </div>

            </Card>

        </div>

    );

}
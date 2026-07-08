import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Save,
    Trash2,
} from "lucide-react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import Input from "../../../../../shared/components/Input";
import Spinner from "../../../../../shared/components/Spinner";
import Toast from "../../../../../shared/components/Toast";

import {
    deleteSupplier,
    getSupplierById,
    updateSupplier,
} from "../../services/supplierService";

import type { Supplier } from "../../types/Supplier";

import "./EditSupplierPage.css";

export default function EditSupplierPage() {

    const { supplierId } = useParams();

    const navigate = useNavigate();

    const [supplier, setSupplier] =
        useState<Supplier | null>(null);

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

    const [name, setName] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [email, setEmail] =
        useState("");

    useEffect(() => {

        async function loadSupplier() {

            if (!supplierId) {
                return;
            }

            setLoading(true);

            setError("");

            try {

                const response =
                    await getSupplierById(
                        Number(supplierId)
                    );

                setSupplier(response);

                setName(response.name);

                setPhone(response.phone);

                setEmail(response.email);

            } catch {

                setError(
                    "No fue posible cargar el proveedor."
                );

            } finally {

                setLoading(false);

            }

        }

        loadSupplier();

    }, [supplierId]);

    async function handleUpdateSupplier() {

        if (!supplier) {
            return;
        }

        try {

            const response =
                await updateSupplier(
                    supplier.id,
                    {
                        name,
                        phone,
                        email,
                    }
                );

            setSupplier(response);

            setToastVariant(
                "success"
            );

            setToastMessage(
                "Proveedor actualizado correctamente."
            );

            setToastOpen(true);

        } catch {

            setToastVariant(
                "danger"
            );

            setToastMessage(
                "No fue posible actualizar el proveedor."
            );

            setToastOpen(true);

        }

    }

    async function handleDeleteSupplier() {

        if (!supplier) {
            return;
        }

        const confirmed =
            window.confirm(
                "¿Está seguro de eliminar este proveedor?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteSupplier(
                supplier.id
            );

            navigate(
                "/purchases/suppliers"
            );

        } catch {

            setToastVariant(
                "danger"
            );

            setToastMessage(
                "No fue posible eliminar el proveedor."
            );

            setToastOpen(true);

        }

    }

    if (loading) {

        return (
            <div className="edit-supplier-page__loading">
                <Spinner
                    label="Cargando proveedor..."
                />
            </div>
        );

    }

    return (

        <div className="edit-supplier-page">

            <div className="edit-supplier-page__header">

                <div>

                    <h1 className="edit-supplier-page__title">
                        Editar proveedor
                    </h1>

                    <p className="edit-supplier-page__subtitle">
                        Actualice la información del proveedor.
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

                <div className="edit-supplier-page__form">

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
                        label="Correo electrónico"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                    />

                </div>

                <div className="edit-supplier-page__actions">

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

                    <Button
                        variant="danger"
                        onClick={
                            handleDeleteSupplier
                        }
                    >
                        <Trash2 size={18} />
                        Eliminar
                    </Button>

                    <Button
                        onClick={
                            handleUpdateSupplier
                        }
                    >
                        <Save size={18} />
                        Guardar cambios
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
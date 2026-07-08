import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Alert from "../../../../../shared/components/Alert";
import Button from "../../../../../shared/components/Button";
import Card from "../../../../../shared/components/Card";
import Input from "../../../../../shared/components/Input";
import Textarea from "../../../../../shared/components/Textarea";
import Toast from "../../../../../shared/components/Toast";
import Select from "../../../../../shared/components/Select";

import { createProduct } from "../../services/productService";

import { getAllSuppliers } from "../../../../purchases/supplier/services/supplierService";

import type { Supplier } from "../../../../purchases/supplier/types/Supplier";

import "./CreateProductPage.css";
import CurrencyInput from "../../../../../shared/components/CurrencyInput";
export default function CreateProductPage() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [stock, setStock] = useState(0);

    const [price, setPrice] = useState(0);

    const [batch, setBatch] = useState("");

    const [expirationDate, setExpirationDate] = useState("");

    const [supplierId, setSupplierId] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [toastOpen, setToastOpen] = useState(false);

    useEffect(() => {

        loadSuppliers();

    }, []);

    async function loadSuppliers() {

        try {

            const response =
                await getAllSuppliers();

            setSuppliers(response);

        } catch {

            setError(
                "No fue posible cargar los proveedores."
            );

        }

    }

    async function handleCreateProduct() {

        setLoading(true);

        setError("");

        try {

            console.log(supplierId);

            await createProduct({
                name,
                description,
                stock,
                price,
                batch,
                expirationDate,
                supplierId: Number(supplierId),
            });

            setToastOpen(true);

            setTimeout(() => {

                navigate("/inventory/products");

            }, 1200);

        } catch {

            setError(
                "No fue posible crear el producto."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="create-product-page">

            <Toast
                open={toastOpen}
                variant="success"
                message="Producto creado correctamente."
                onClose={() => setToastOpen(false)}
            />

            <div className="create-product-page__header">

                <div>

                    <h1 className="create-product-page__title">
                        Crear producto
                    </h1>

                    <p className="create-product-page__subtitle">
                        Registre un nuevo producto en el inventario.
                    </p>

                </div>

                <Button
                    variant="secondary"
                    onClick={() =>
                        navigate("/inventory/products")
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

                <div className="create-product-page__form">

                    <Input
                        label="Nombre"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />

                    <Textarea
                        label="Descripción"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                    />

                    <Input
                        type="number"
                        label="Stock"
                        min={0}
                        value={stock}
                        onChange={(event) =>
                            setStock(Number(event.target.value))
                        }
                    />

                    <CurrencyInput
                        label="Precio"
                        value={price}
                        onValueChange={setPrice}
                    />

                    <Input
                        label="Lote"
                        value={batch}
                        onChange={(event) =>
                            setBatch(event.target.value)
                        }
                    />

                    <Input
                        type="date"
                        label="Fecha de vencimiento"
                        value={expirationDate}
                        onChange={(event) =>
                            setExpirationDate(event.target.value)
                        }
                    />
                    <Select
                        label="Proveedor"
                        value={String(supplierId)}
                        placeholder="Seleccione un proveedor"
                        options={suppliers.map((supplier) => ({
                            value: String(supplier.id),
                            label: supplier.name,
                        }))}
                        onChange={(event) =>
                            setSupplierId(event.target.value)
                        }
                    />

                    <div className="create-product-page__actions">

                        <Button
                            variant="secondary"
                            onClick={() =>
                                navigate("/inventory/products")
                            }
                        >
                            Cancelar
                        </Button>

                        <Button
                            loading={loading}
                            onClick={handleCreateProduct}
                        >
                            <Save size={18} />
                            Guardar producto
                        </Button>

                    </div>

                </div>

            </Card>

        </div>

    );

}
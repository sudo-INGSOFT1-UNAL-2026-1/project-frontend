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
import CurrencyInput from "../../../../../shared/components/CurrencyInput";
import Input from "../../../../../shared/components/Input";
import Select from "../../../../../shared/components/Select";
import Spinner from "../../../../../shared/components/Spinner";
import TextArea from "../../../../../shared/components/Textarea";
import Toast from "../../../../../shared/components/Toast";

import {
    deleteProduct,
    getProductById,
    updateProduct,
} from "../../services/productService";

import { getAllSuppliers } from "../../../../purchases/supplier/services/supplierService";

import type { Product } from "../../types/Product";
import type { Supplier } from "../../../../purchases/supplier/types/Supplier";

import "./EditProductPage.css";

export default function EditProductPage() {

    const { productId } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] =
        useState<Product | null>(null);

    const [suppliers, setSuppliers] =
        useState<Supplier[]>([]);

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

    const [description, setDescription] =
        useState("");

    const [stock, setStock] =
        useState(0);

    const [price, setPrice] =
        useState(0);

    const [batch, setBatch] =
        useState("");

    const [expirationDate,
        setExpirationDate] =
        useState("");

    const [supplierId,
        setSupplierId] =
        useState(0);

    useEffect(() => {

        async function loadData() {

            if (!productId) {
                return;
            }

            setLoading(true);

            setError("");

            try {

                const [
                    productResponse,
                    suppliersResponse,
                ] = await Promise.all([
                    getProductById(
                        Number(productId)
                    ),
                    getAllSuppliers(),
                ]);

                setProduct(productResponse);

                setSuppliers(
                    suppliersResponse
                );

                setName(
                    productResponse.name
                );

                setDescription(
                    productResponse.description
                );

                setStock(
                    productResponse.stock
                );

                setPrice(
                    productResponse.price
                );

                setBatch(
                    productResponse.batch
                );

                setExpirationDate(
                    productResponse.expirationDate
                );

                setSupplierId(
                    productResponse.supplierId
                );

            } catch {

                setError(
                    "No fue posible cargar el producto."
                );

            } finally {

                setLoading(false);

            }

        }

        loadData();

    }, [productId]);

    async function handleUpdateProduct() {

        if (!product) {
            return;
        }

        try {

            const response =
                await updateProduct(
                    product.id,
                    {
                        name,
                        description,
                        stock,
                        price,
                        batch,
                        expirationDate,
                        supplierId,
                    }
                );

            setProduct(response);

            setToastVariant(
                "success"
            );

            setToastMessage(
                "Producto actualizado correctamente."
            );

            setToastOpen(true);

        } catch {

            setToastVariant(
                "danger"
            );

            setToastMessage(
                "No fue posible actualizar el producto."
            );

            setToastOpen(true);

        }

    }

    async function handleDeleteProduct() {

        if (!product) {
            return;
        }

        const confirmed =
            window.confirm(
                "¿Desea eliminar este producto?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteProduct(
                product.id
            );

            navigate(
                "/inventory/products"
            );

        } catch {

            setToastVariant(
                "danger"
            );

            setToastMessage(
                "No fue posible eliminar el producto."
            );

            setToastOpen(true);

        }

    }

    if (loading) {

        return (
            <div className="edit-product-page__loading">
                <Spinner
                    label="Cargando producto..."
                />
            </div>
        );

    }

    return (

        <div className="edit-product-page">

            <div className="edit-product-page__header">

                <div>

                    <h1 className="edit-product-page__title">
                        Editar producto
                    </h1>

                    <p className="edit-product-page__subtitle">
                        Actualice la información del producto.
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

                <div className="edit-product-page__form">

                    <Input
                        label="Nombre"
                        value={name}
                        onChange={(event) =>
                            setName(
                                event.target.value
                            )
                        }
                    />

                    <TextArea
                        label="Descripción"
                        value={description}
                        onChange={(event) =>
                            setDescription(
                                event.target.value
                            )
                        }
                    />

                    <Input
                        label="Stock"
                        type="number"
                        min={0}
                        value={stock}
                        onChange={(event) =>
                            setStock(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                    />

                    <CurrencyInput
                        label="Precio"
                        value={price}
                        onValueChange={
                            setPrice
                        }
                    />

                    <Input
                        label="Lote"
                        value={batch}
                        onChange={(event) =>
                            setBatch(
                                event.target.value
                            )
                        }
                    />

                    <Input
                        label="Fecha de vencimiento"
                        type="date"
                        value={expirationDate}
                        onChange={(event) =>
                            setExpirationDate(
                                event.target.value
                            )
                        }
                    />

                    <Select
                        label="Proveedor"
                        value={String(
                            supplierId
                        )}
                        options={suppliers.map(
                            (
                                supplier
                            ) => ({
                                value: String(
                                    supplier.id
                                ),
                                label:
                                    supplier.name,
                            })
                        )}
                        onChange={(
                            event
                        ) =>
                            setSupplierId(
                                Number(
                                    event.target
                                        .value
                                )
                            )
                        }
                    />

                </div>

                <div className="edit-product-page__actions">

                    <Button
                        variant="secondary"
                        onClick={() =>
                            navigate(
                                "/inventory/products"
                            )
                        }
                    >
                        <ArrowLeft
                            size={18}
                        />
                        Volver
                    </Button>

                    <Button
                        variant="danger"
                        onClick={
                            handleDeleteProduct
                        }
                    >
                        <Trash2
                            size={18}
                        />
                        Eliminar
                    </Button>

                    <Button
                        onClick={
                            handleUpdateProduct
                        }
                    >
                        <Save
                            size={18}
                        />
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
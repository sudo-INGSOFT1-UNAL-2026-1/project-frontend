import {
    useEffect,
    useMemo,
    useState,
} from "react";
import { Plus } from "lucide-react";

import Button from "../../../../shared/components/Button";
import Card from "../../../../shared/components/Card";
import Input from "../../../../shared/components/Input";
import Select from "../../../../shared/components/Select";
import Toast from "../../../../shared/components/Toast";

import type { Product } from "../../../inventory/product/types/Product";
import type { PurchaseProductRequest } from "../types/PurchaseProductRequest";

interface ProductSelectorProps {

    supplierId: number;

    products: Product[];

    onAddProduct: (
        product: PurchaseProductRequest
    ) => void;

}

export default function ProductSelector({

    supplierId,

    products,

    onAddProduct,

}: ProductSelectorProps) {

    const [productId, setProductId] =
        useState(0);

    const [quantity, setQuantity] =
        useState(1);

    const [unitPrice, setUnitPrice] =
        useState(0);

    const [toastOpen, setToastOpen] =
        useState(false);

    const [toastMessage, setToastMessage] =
        useState("");

    const [toastVariant, setToastVariant] =
        useState<"success" | "danger">(
            "success"
        );

    const availableProducts = useMemo(() => {

        return products.filter(
            (product) =>
                product.supplierId ===
                supplierId
        );

    }, [products, supplierId]);

    useEffect(() => {

        if (!productId) {

            setUnitPrice(0);

            return;

        }

        const product = products.find(
            (item) =>
                item.id === productId
        );

        if (product) {

            setUnitPrice(
                product.price
            );

        }

    }, [productId, products]);

    function handleAdd() {

        if (!productId) {

            setToastVariant(
                "danger"
            );

            setToastMessage(
                "Seleccione un producto."
            );

            setToastOpen(true);

            return;

        }

        if (quantity <= 0) {

            setToastVariant(
                "danger"
            );

            setToastMessage(
                "La cantidad debe ser mayor que cero."
            );

            setToastOpen(true);

            return;

        }

        onAddProduct({

            productId,

            quantity,

            unitPrice,

        });

        setProductId(0);

        setQuantity(1);

        setUnitPrice(0);

        setToastVariant(
            "success"
        );

        setToastMessage(
            "Producto agregado."
        );

        setToastOpen(true);

    }

    return (

        <>

            <Card>

                <h3>
                    Agregar producto
                </h3>

                <Select
                    label="Producto"
                    value={
                        productId === 0
                            ? ""
                            : String(
                                  productId
                              )
                    }
                    placeholder="Seleccione un producto"
                    disabled={
                        supplierId === 0
                    }
                    options={availableProducts.map(
                        (product) => ({
                            value: String(
                                product.id
                            ),
                            label: product.name,
                        })
                    )}
                    onChange={(event) =>
                        setProductId(
                            Number(
                                event.target
                                    .value
                            )
                        )
                    }
                />

                <Input
                    label="Cantidad"
                    type="number"
                    min={1}
                    value={String(
                        quantity
                    )}
                    onChange={(event) =>
                        setQuantity(
                            Number(
                                event.target
                                    .value
                            )
                        )
                    }
                />

                <Input
                    label="Precio unitario"
                    type="currency"
                    value={String(
                        unitPrice
                    )}
                    onChange={(event) =>
                        setUnitPrice(
                            Number(
                                event.target
                                    .value
                            )
                        )
                    }
                />

                <Button
                    onClick={handleAdd}
                >
                    <Plus size={18} />
                    Agregar producto
                </Button>

            </Card>

            <Toast
                open={toastOpen}
                variant={toastVariant}
                message={toastMessage}
                onClose={() =>
                    setToastOpen(false)
                }
            />

        </>

    );

}
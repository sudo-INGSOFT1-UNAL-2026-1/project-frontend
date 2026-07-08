import { useEffect, useMemo, useState } from "react";

import type { Product } from "../../../inventory/product/types/Product";
import type { PurchaseProductRequest } from "../types/PurchaseProductRequest";

interface ProductSelectorProps {

    supplierId: number;

    products: Product[];

    onAddProduct: (product: PurchaseProductRequest) => void;

}

export default function ProductSelector({

    supplierId,

    products,

    onAddProduct,

}: ProductSelectorProps) {

    const [productId, setProductId] = useState(0);

    const [quantity, setQuantity] = useState(1);

    const [unitPrice, setUnitPrice] = useState(0);

    const availableProducts = useMemo(() => {

        return products.filter(
            (product) => product.supplierId === supplierId
        );

    }, [products, supplierId]);

    useEffect(() => {

        if (!productId) {

            setUnitPrice(0);

            return;

        }

        const product = products.find(
            (item) => item.id === productId
        );

        if (product) {

            setUnitPrice(product.price);

        }

    }, [productId, products]);

    function handleAdd() {

        if (!productId) {

            alert("Seleccione un producto.");

            return;

        }

        if (quantity <= 0) {

            alert("La cantidad debe ser mayor que cero.");

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

    }

    return (

        <div>

            <h3>Agregar producto</h3>

            <div>

                <label>Producto</label>

                <br />

                <select
                    value={productId}
                    onChange={(e) =>
                        setProductId(Number(e.target.value))
                    }
                    disabled={supplierId === 0}
                >

                    <option value={0}>
                        Seleccione un producto
                    </option>

                    {availableProducts.map((product) => (

                        <option
                            key={product.id}
                            value={product.id}
                        >
                            {product.name}
                        </option>

                    ))}

                </select>

            </div>

            <br />

            <div>

                <label>Cantidad</label>

                <br />

                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(Number(e.target.value))
                    }
                />

            </div>

            <br />

            <div>

                <label>Precio unitario</label>

                <br />

                <input
                    type="number"
                    value={unitPrice}
                    onChange={(e) =>
                        setUnitPrice(Number(e.target.value))
                    }
                />

            </div>

            <br />

            <button onClick={handleAdd}>
                Agregar producto
            </button>

        </div>

    );

}
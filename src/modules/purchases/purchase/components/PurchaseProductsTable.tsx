import type { Product } from "../../../inventory/product/types/Product";
import type { PurchaseProductRequest } from "../types/PurchaseProductRequest";

interface PurchaseProductsTableProps {

    items: PurchaseProductRequest[];

    products: Product[];

    onRemove: (index: number) => void;

}

export default function PurchaseProductsTable({

    items,

    products,

    onRemove,

}: PurchaseProductsTableProps) {

    function getProductName(productId: number) {

        const product = products.find(
            (product) => product.id === productId
        );

        return product ? product.name : "Producto";

    }

    if (items.length === 0) {

        return (

            <div>

                <h3>Productos</h3>

                <p>No hay productos agregados.</p>

            </div>

        );

    }

    return (

        <div>

            <h3>Productos agregados</h3>

            <table>

                <thead>

                    <tr>

                        <th>Producto</th>

                        <th>Cantidad</th>

                        <th>Precio Unitario</th>

                        <th>Subtotal</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {items.map((item, index) => (

                        <tr key={index}>

                            <td>

                                {getProductName(item.productId)}

                            </td>

                            <td>

                                {item.quantity}

                            </td>

                            <td>

                                ${item.unitPrice}

                            </td>

                            <td>

                                ${item.quantity * item.unitPrice}

                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        onRemove(index)
                                    }
                                >
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}
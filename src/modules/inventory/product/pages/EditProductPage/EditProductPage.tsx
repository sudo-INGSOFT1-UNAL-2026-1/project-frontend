import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    deleteProduct,
    getProductById,
    updateProduct,
} from "../../services/productService";

import { getAllSuppliers } from "../../../../purchases/supplier/services/supplierService";

import type { Product } from "../../types/Product";
import type { Supplier } from "../../../../purchases/supplier/types/Supplier";

export default function EditProductPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [stock, setStock] = useState(0);

    const [price, setPrice] = useState(0);

    const [batch, setBatch] = useState("");

    const [expirationDate, setExpirationDate] = useState("");

    const [supplierId, setSupplierId] = useState(0);

    useEffect(() => {

        loadProduct();

        loadSuppliers();

    }, [id]);

    async function loadProduct() {

        if (!id) return;

        try {

            const response = await getProductById(Number(id));

            setProduct(response);

            setName(response.name);

            setDescription(response.description);

            setStock(response.stock);

            setPrice(response.price);

            setBatch(response.batch);

            setExpirationDate(response.expirationDate);

            setSupplierId(response.supplierId);

        } catch (error) {

            console.error(error);

            alert("Error al cargar el producto.");

        }

    }

    async function loadSuppliers() {

        try {

            const response = await getAllSuppliers();

            setSuppliers(response);

        } catch (error) {

            console.error(error);

            alert("Error al cargar los proveedores.");

        }

    }

    async function handleUpdateProduct() {

        if (!product) return;

        try {

            const response = await updateProduct(
                product.id,
                {
                    name,
                    description,
                    stock,
                    price,
                    batch,
                    expirationDate,
                    supplierId,
                },
            );

            setProduct(response);

            alert("Producto actualizado correctamente.");

        } catch (error) {

            console.error(error);

            alert("Error al actualizar el producto.");

        }

    }

    async function handleDeleteProduct() {

        if (!product) return;

        const confirmed = window.confirm(
            "¿Estás seguro de que quieres eliminar este producto?"
        );

        if (!confirmed) return;

        try {

            await deleteProduct(product.id);

            alert("Producto eliminado correctamente.");

            navigate("/inventory/products");

        } catch (error) {

            console.error(error);

            alert("Error al eliminar el producto.");

        }

    }

    if (!product) {

        return <p>Loading...</p>;

    }

    return (

        <div>

            <h1>Editar Producto</h1>

            <hr />

            <div>

                <label>Nombre</label>

                <br />

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Descripción</label>

                <br />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Stock</label>

                <br />

                <input
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                />

            </div>

            <br />

            <div>

                <label>Precio</label>

                <br />

                <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />

            </div>

            <br />

            <div>

                <label>Batch</label>

                <br />

                <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Fecha de Expiración</label>

                <br />

                <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Proveedor</label>

                <br />

                <select
                    value={supplierId}
                    onChange={(e) => setSupplierId(Number(e.target.value))}
                >

                    <option value={0}>
                        Seleccione un proveedor
                    </option>

                    {suppliers.map((supplier) => (

                        <option
                            key={supplier.id}
                            value={supplier.id}
                        >
                            {supplier.name}
                        </option>

                    ))}

                </select>

            </div>

            <br />

            <button onClick={handleUpdateProduct}>
                Actualizar Producto
            </button>

            <button onClick={handleDeleteProduct}>
                Eliminar Producto
            </button>

            <button
                onClick={() => navigate("/inventory/products")}
            >
                Atrás
            </button>

        </div>

    );

}


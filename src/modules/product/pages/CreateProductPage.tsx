
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createProduct } from "../services/productService";

import { getAllSuppliers } from "../../purchases/supplier/services/supplierService";

import type { Supplier } from "../../purchases/supplier/types/Supplier";

export default function CreateProductPage() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    const [name, setName] = useState("");

    const [description, setDescription] = useState("");

    const [stock, setStock] = useState(0);

    const [price, setPrice] = useState(0);

    const [batch, setBatch] = useState("");

    const [expirationDate, setExpirationDate] = useState("");

    const [supplierId, setSupplierId] = useState(0);

    useEffect(() => {

        loadSuppliers();

    }, []);

    async function loadSuppliers() {

        try {

            const response = await getAllSuppliers();

            setSuppliers(response);

        } catch (error) {

            console.error(error);

            alert("Error al cargar los proveedores.");

        }

    }

    async function handleCreateProduct() {

        try {

            await createProduct({
                name,
                description,
                stock,
                price,
                batch,
                expirationDate,
                supplierId,
            });

            alert("Producto creado exitosamente.");

            navigate("/inventory/products");

        } catch (error) {

            console.error(error);

            alert("No fue posible crear el producto.");

        }

    }

    return (

        <div>

            <h1>Crear Producto</h1>

            <hr />

            <div>

                <label>Nombre:</label>

                <br />

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Descripción:</label>

                <br />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Stock:</label>

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

                <label>Precio:</label>

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

                <label>Lote:</label>

                <br />

                <input
                    type="text"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Fecha de vencimiento:</label>

                <br />

                <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Proveedor:</label>

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

            <button onClick={handleCreateProduct}>
                Crear
            </button>

            <button
                onClick={() => navigate("/inventory/products")}
            >
                Volver
            </button>

        </div>

    );

}

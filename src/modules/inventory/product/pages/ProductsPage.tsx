import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllProducts } from "../services/productService";

import type { Product } from "../types/Product";

export default function ProductsPage() {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        loadProducts();
    } , []);

    async function loadProducts() {

        try {
            const response = await getAllProducts();

            setProducts(response);

        } catch (error) {
            console.error(error);
            alert("Error al cargar los productos.");
        }
    }

    return (
        <div>
            <h1>Productos</h1>
            <button onClick={() => navigate("/products/new")}>
                Agregar Producto
            </button>

            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Lote</th>
                        <th>Fecha de Expiración</th>
                        <th>Proveedor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>{product.batch}</td>
                            <td>{product.expirationDate}</td>
                            <td>{product.supplierId}</td>
                            <td>
                                <button onClick={() => navigate(`/products/${product.id}/edit`)}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllSuppliers } from "../services/supplierService";

import type { Supplier } from "../types/Supplier";

export default function SuppliersPage() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

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

    return (

        <div>

            <h1>Proveedores</h1>

            <button
                onClick={() => navigate("/purchases/suppliers/create")}
            >
                Crear Proveedor
            </button>

            <hr />

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Nombre</th>

                        <th>Teléfono</th>

                        <th>Correo Electrónico</th>

                        <th>Acciones </th>

                    </tr>

                </thead>

                <tbody>

                    {suppliers.map((supplier) => (

                        <tr key={supplier.id}>

                            <td>{supplier.id}</td>

                            <td>{supplier.name}</td>

                            <td>{supplier.phone}</td>

                            <td>{supplier.email}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        navigate(`/purchases/suppliers/edit/${supplier.id}`)
                                    }
                                >
                                    Edit
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}
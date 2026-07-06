import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createSupplier } from "../services/supplierService";

export default function CreateSupplierPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [phone, setPhone] = useState("");

    const [email, setEmail] = useState("");

    async function handleCreateSupplier() {

        try {

            await createSupplier({
                name,
                phone,
                email,
            });

            alert("Proveedor creado exitosamente.");

            navigate("/suppliers");

        } catch (error) {

            console.error(error);

            alert("Error al crear el proveedor.");

        }

    }

    return (

        <div>

            <h1>Crear Proveedor</h1>

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

                <label>Teléfono</label>

                <br />

                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Email</label>

                <br />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>

            <br />

            <button onClick={handleCreateSupplier}>
                Guardar
            </button>

            <button
                onClick={() => navigate("/suppliers")}
            >
                Back
            </button>

        </div>

    );

}
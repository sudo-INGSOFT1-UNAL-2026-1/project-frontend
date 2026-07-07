import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCustomer } from "../../services/customerService";

export default function CreateCustomerPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [phone, setPhone] = useState("");

    const [email, setEmail] = useState("");

    async function handleCreateCustomer() {

        try {

            await createCustomer({
                name,
                phone,
                email,
            });

            alert("Cliente creado exitosamente.");

            navigate("/sales/customers");

        } catch (error) {

            console.error(error);

            alert("No fue posible crear el cliente.");

        }

    }

    return (

        <div>

            <h1>Crear Cliente</h1>

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

                <label>Correo electrónico</label>

                <br />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            </div>

            <br />

            <button onClick={handleCreateCustomer}>
                Crear
            </button>

            <button
                onClick={() => navigate("/sales/customers")}
            >
                Volver
            </button>

        </div>

    );

}
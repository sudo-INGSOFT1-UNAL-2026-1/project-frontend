import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    deleteSupplier,
    getSupplierById,
    updateSupplier,
} from "../services/supplierService";

import type { Supplier } from "../types/Supplier";

export default function EditSupplierPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [supplier, setSupplier] = useState<Supplier | null>(null);

    const [name, setName] = useState("");

    const [phone, setPhone] = useState("");

    const [email, setEmail] = useState("");

    useEffect(() => {

        loadSupplier();

    }, [id]);

    async function loadSupplier() {

        if (!id) return;

        try {

            const response = await getSupplierById(Number(id));

            setSupplier(response);

            setName(response.name);

            setPhone(response.phone);

            setEmail(response.email);

        } catch (error) {

            console.error(error);

            alert("Error loading supplier.");

        }

    }

    async function handleUpdateSupplier() {

        if (!supplier) return;

        try {

            const response = await updateSupplier(
                supplier.id,
                {
                    name,
                    phone,
                    email,
                },
            );

            setSupplier(response);

            alert("Supplier updated successfully.");

        } catch (error) {

            console.error(error);

            alert("Error updating supplier.");

        }

    }

    async function handleDeleteSupplier() {

        if (!supplier) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this supplier?"
        );

        if (!confirmed) return;

        try {

            await deleteSupplier(supplier.id);

            alert("Supplier deleted successfully.");

            navigate("/purchases/suppliers");

        } catch (error) {

            console.error(error);

            alert("Error deleting supplier.");

        }

    }

    if (!supplier) {

        return <p>Loading...</p>;

    }

    return (

        <div>

            <h1>Edit Supplier</h1>

            <hr />

            <div>

                <label>Name</label>

                <br />

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </div>

            <br />

            <div>

                <label>Phone</label>

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

            <button onClick={handleUpdateSupplier}>
                Update Supplier
            </button>

            <button onClick={handleDeleteSupplier}>
                Delete Supplier
            </button>

            <button
                onClick={() => navigate("/purchases/suppliers")}
            >
                Back
            </button>

        </div>

    );

}


import { apiClient } from "../../../../api/axios";

import type { Supplier } from "../types/Supplier";
import type { SupplierRequest } from "../types/SupplierRequest";

export async function createSupplier(
    request: SupplierRequest
): Promise<Supplier> {

    const response = await apiClient.post<Supplier>("/supplier/create", request);

    return response.data;
}

export async function getAllSuppliers(): Promise<Supplier[]> {
    
    const response = await apiClient.get<Supplier[]>("/supplier/all");

    return response.data;

}

export async function getSupplierById(id: number): Promise<Supplier> {

    const response = await apiClient.get<Supplier>(`/supplier/${id}`);

    return response.data;
}

export async function updateSupplier(
    supplierId: number, 
    request: SupplierRequest
): Promise<Supplier> {

    const response = await apiClient.put<Supplier>(
        `/supplier/update/${supplierId}`, request
    );

    return response.data;
}


export async function deleteSupplier(id: number): Promise<void> {
    
    await apiClient.delete(`/supplier/${id}`);

}
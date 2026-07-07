import * as supplierApi from "../api/supplierApi";

import type { Supplier } from "../types/Supplier";
import type { SupplierRequest } from "../types/SupplierRequest";

export async function createSupplier(
    request: SupplierRequest
): Promise<Supplier> {

    return await supplierApi.createSupplier(request);
}

export async function getAllSuppliers(): Promise<Supplier[]> {

    return await supplierApi.getAllSuppliers();

}

export async function getSupplierById(id: number): Promise<Supplier> {

    return await supplierApi.getSupplierById(id);

}

export async function updateSupplier(
    supplierId: number, 
    request: SupplierRequest
): Promise<Supplier> {

    return await supplierApi.updateSupplier(supplierId, request);
}


export async function deleteSupplier(id: number): Promise<void> {
    
    return await supplierApi.deleteSupplier(id);

}
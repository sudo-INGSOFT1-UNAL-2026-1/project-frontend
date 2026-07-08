import { apiClient } from "../../../../api/axios";

import type { Purchase } from "../types/Purchase";
import type { PurchaseRequest } from "../types/PurchaseRequest";


export async function createPurchase(request: PurchaseRequest) {

    const response = await apiClient.post<Purchase>(
        "/purchase/create",
        request
    );

    return response.data;

}

export async function updatePurchase(
    purchaseId: number,
    request: PurchaseRequest
) {

    const response = await apiClient.put<Purchase>(
        `/purchase/update/${purchaseId}`,
        request
    );

    return response.data;

}

export async function deletePurchase(purchaseId: number) {

    await apiClient.delete(
        `/purchase/${purchaseId}`
    );

}

export async function getPurchaseById(purchaseId: number) {

    const response = await apiClient.get<Purchase>(
        `/purchase/${purchaseId}`);
        
    return response.data;

}

export async function getAllPurchases() {

    const response = await apiClient.get<Purchase[]>(
        "/purchase/all"
    );

    return response.data;

}

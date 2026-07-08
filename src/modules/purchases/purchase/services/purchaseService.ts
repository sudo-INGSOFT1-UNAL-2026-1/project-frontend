import * as purchaseApi from "../api/purchaseApi";

import type { PurchaseRequest } from "../types/PurchaseRequest";

export async function createPurchase(request: PurchaseRequest) {

    return await purchaseApi.createPurchase(request);

}

export async function updatePurchase(
    purchaseId: number,
    request: PurchaseRequest
) {

    return await purchaseApi.updatePurchase(
        purchaseId,
        request
    );

}

export async function deletePurchase(purchaseId: number) {

    return await purchaseApi.deletePurchase(
        purchaseId
    );

}

export async function getPurchaseById(purchaseId: number) {

    return await purchaseApi.getPurchaseById(purchaseId);

}

export async function getAllPurchases() {

    return await purchaseApi.getAllPurchases();

}
import { apiClient } from "../../../../api/axios";

import type { Sale } from "../types/Sale";
import type { SaleCreateRequest } from "../types/SaleCreateRequest";
import type { SaleUpdateRequest } from "../types/SaleUpdateRequest";

export async function createSale(request: SaleCreateRequest) {

    const response = await apiClient.post<Sale>(
        "/sales/quote",
        request
    );

    return response.data;

}

export async function getAllSales() {

    const response = await apiClient.get<Sale[]>(
        "/sales"
    );

    return response.data;

}

export async function getSaleById(saleId: number) {

    const response = await apiClient.get<Sale>(
        `/sales/${saleId}`
    );

    return response.data;

}

export async function updateSale(
    saleId: number,
    request: SaleUpdateRequest
) {

    const response = await apiClient.put<Sale>(
        `/sales/${saleId}`,
        request
    );

    return response.data;

}

export async function deleteSale(saleId: number) {

    await apiClient.delete(
        `/sales/${saleId}`
    );

}
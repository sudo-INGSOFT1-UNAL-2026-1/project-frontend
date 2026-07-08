import * as saleApi from "../api/saleApi";

import type { SaleCreateRequest } from "../types/SaleCreateRequest";
import type { SaleUpdateRequest } from "../types/SaleUpdateRequest";

export async function createSale(request: SaleCreateRequest) {

    return await saleApi.createSale(request);

}

export async function getAllSales() {

    return await saleApi.getAllSales();

}

export async function getSaleById(saleId: number) {

    return await saleApi.getSaleById(saleId);

}

export async function updateSale(
    saleId: number,
    request: SaleUpdateRequest
) {

    return await saleApi.updateSale(saleId, request);

}
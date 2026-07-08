import type { PurchaseProductRequest } from "./PurchaseProductRequest";

export interface PurchaseRequest {

    supplierId: number;

    userId: number;

    paymentDate: string;

    deliveryDate: string;

    state: string;

    totalCost: number;

    products: PurchaseProductRequest[];

}
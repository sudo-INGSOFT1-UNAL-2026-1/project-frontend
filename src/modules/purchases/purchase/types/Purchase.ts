import type { PurchaseProduct } from "./PurchaseProduct";

export interface Purchase {

    id: number;

    supplierId: number;

    userId: number;

    paymentDate: string;

    deliveryDate: string;

    state: string;

    totalCost: number;

    purchaseProducts: PurchaseProduct[];

}
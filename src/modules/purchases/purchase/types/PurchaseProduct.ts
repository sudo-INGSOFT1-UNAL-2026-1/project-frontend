import type { Product } from "../../../inventory/product/types/Product";

export interface PurchaseProduct {

    id: number;

    purchaseId: number;

    productId: number;

    product: Product;

    quantity: number;

    unitPrice: number;

    subtotal: number;

}
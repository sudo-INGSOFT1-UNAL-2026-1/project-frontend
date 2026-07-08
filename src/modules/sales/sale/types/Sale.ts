import type { Product } from "../../../inventory/product/types/Product";

export interface SaleProduct {

    id: number;

    saleId: number;

    productId: number;

    product?: Product;

    quantity: number;

    unitPrice: number;

    subtotal?: number;

}

export interface Sale {

    id: number;

    customerId: number;

    customerName: string;

    customerAddress: string;

    description: string;

    deliveryDate: string;

    status: string;

    totalCost: number;

    saleProducts?: SaleProduct[];

    products?: SaleProduct[];

}
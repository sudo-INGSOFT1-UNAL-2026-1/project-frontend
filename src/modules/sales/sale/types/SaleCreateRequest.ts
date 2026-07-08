import type { SaleProductRequest } from "./SaleProductRequest";

export interface SaleCreateRequest {

    customerId: number;

    userId: number;

    customerName: string;

    customerAddress: string;

    description: string;

    deliveryDate: string;

    products: SaleProductRequest[];

}
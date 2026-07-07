import type { LocalDate } from "./Product";

export interface ProductRequest {

    name: string;

    description: string;

    stock: number;

    price: number;

    batch: string;

    expirationDate: LocalDate;

    supplierId: number;

}
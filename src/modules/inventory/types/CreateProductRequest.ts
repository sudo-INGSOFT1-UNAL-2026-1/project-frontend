import type { LocalDate } from "./Product";

export interface CreateProductRequest {

    name: string;

    description: string;

    stock: number;

    price: number;

    batch: string;

    expirationDate: LocalDate;

    supplierId: number;

}
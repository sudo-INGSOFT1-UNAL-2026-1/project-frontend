export type LocalDate = string;


export interface Product {
    
    id: number;
    
    name: string;

    description: string;

    stock: number;

    price: number;

    batch: string;

    expirationDate: LocalDate;

    supplierId: number;

}
import * as productApi from "../api/productApi";

import type { Product } from "../types/Product";
import type { ProductRequest } from "../types/ProductRequest";

export async function createProduct(request: ProductRequest): Promise<Product> {

    return await productApi.createProduct(request);

}

export async function updateProduct(
    productId: number, 
    request: ProductRequest
): Promise<Product> {

    return await productApi.updateProduct(productId, request);

}

export async function deleteProduct(id: number): Promise<void> {

    return await productApi.deleteProduct(id);

}

export async function getProductById(id: number): Promise<Product> {

    return await productApi.getProductById(id);

}


export async function getAllProducts(): Promise<Product[]> {

    return await productApi.getAllProducts();   

}
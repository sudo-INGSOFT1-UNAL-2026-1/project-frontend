import { apiClient } from "../../../api/axios";

import type { Product } from "../types/Product";
import type { ProductRequest } from "../types/ProductRequest";

export async function createProduct(request: ProductRequest): Promise<Product> {

    const response = await apiClient.post<Product>("/product/create", request);

    return response.data;
}

export async function deleteProduct(productId: number): Promise<void> {
    
    await apiClient.delete(`/product/${productId}`);

}

export async function getProductById(id : number): Promise<Product> {

    const response = await apiClient.get<Product>(`/product/${id}`);

    return response.data;

}

export async function updateProduct(productId: number, request: ProductRequest): Promise<Product> {

    const response = await apiClient.put<Product>(`/product/update/${productId}`, request);

    return response.data;
}

export async function getAllProducts(): Promise<Product[]> {

    const response = await apiClient.get<Product[]>("/product/all");

    return response.data;
}
import { apiClient } from "../../../api/axios";

import type { Product } from "../types/Product";
import type { CreateProductRequest } from "../types/CreateProductRequest";

export async function createProduct(request: CreateProductRequest): Promise<Product> {

    const response = await apiClient.post<Product>("/product/create", request);

    return response.data;
}
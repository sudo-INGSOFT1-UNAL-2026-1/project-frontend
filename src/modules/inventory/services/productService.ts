import * as productApi from "../api/productApi";

import type { Product } from "../types/Product";
import type { CreateProductRequest } from "../types/CreateProductRequest";

export async function createProduct(request: CreateProductRequest): Promise<Product> {

    return await productApi.createProduct(request);

}
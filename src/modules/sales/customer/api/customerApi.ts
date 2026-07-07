import { apiClient } from "../../../../../api/axios";

import type { Customer } from "../types/Customer";
import type { CustomerRequest } from "../types/CustomerRequest";

export async function createCustomer(request: CustomerRequest) {

    const response = await apiClient.post<Customer>(
        "/customer/create",
        request
    );

    return response.data;

}

export async function getAllCustomers() {

    const response = await apiClient.get<Customer[]>("/customer/all");

    return response.data;

}
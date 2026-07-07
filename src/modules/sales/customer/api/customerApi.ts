import { apiClient } from "../../../../api/axios";

import type { Customer } from "../types/Customer";
import type { CustomerRequest } from "../types/CustomerRequest";
import type { CustomerUpdateRequest } from "../types/CustomerUpdateRequest";

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

export async function getCustomerById(customerId: number) {

    const response = await apiClient.get<Customer>(
        `/customer/${customerId}`
    );

    return response.data;

}

export async function updateCustomer(
    customerId: number,
    request: CustomerUpdateRequest
) {

    const response = await apiClient.put<Customer>(
        `/customer/edit/${customerId}`,
        request
    );

    return response.data;

}

export async function deleteCustomer(customerId: number) {

    await apiClient.delete(`/customer/${customerId}`);

}
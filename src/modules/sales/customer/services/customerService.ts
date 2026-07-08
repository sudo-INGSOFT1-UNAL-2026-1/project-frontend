import * as customerApi from "../api/customerApi";

import type { CustomerRequest } from "../types/CustomerRequest";
import type { CustomerUpdateRequest } from "../types/CustomerUpdateRequest";

export async function createCustomer(request: CustomerRequest) {

    return await customerApi.createCustomer(request);

}
    
    export async function getAllCustomers() {

    return await customerApi.getAllCustomers();

}

export async function getCustomerById(customerId: number) {

    return await customerApi.getCustomerById(customerId);

}

export async function updateCustomer(
    customerId: number,
    request: CustomerUpdateRequest
) {

    return await customerApi.updateCustomer(customerId, request);

}

export async function deleteCustomer(customerId: number) {

    return await customerApi.deleteCustomer(customerId);

}
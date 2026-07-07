import * as customerApi from "../api/customerApi";

import type { CustomerRequest } from "../types/CustomerRequest";

export async function createCustomer(request: CustomerRequest) {

    return await customerApi.createCustomer(request);

}
    
    export async function getAllCustomers() {

    return await customerApi.getAllCustomers();

}
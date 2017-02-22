import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from '../services/api.service';
import { CookiesService } from './cookies.service';
import { CustomerInfo } from './customer-info';

@Injectable()
export class CustomerService {
    private customerApi = `${ApiService.apiUrl}/customer`;

    constructor(private http: Http) {}

    // Public: Get customer name from cookie
    public getCurCustomerName(): string {
        return CookiesService.get('name');
    }

    // Public: Get customer id from cookie
    public getCurCustomerId(): string {
        return CookiesService.get('sub');
    }

    // Public: Get all customers from api
    public getAllCustomers(): Observable<CustomerInfo[]> {
        let url = `${ApiService.apiUrl}/customers`;
        return this.http.get(url).map(response => {
            return response.json() as CustomerInfo[];
        });
    }

    // Public: Get a customer info according to ID
    public getCustomer(customerId: string): Observable<CustomerInfo[]> {
        let url = `${this.customerApi}/${customerId}`;
        return this.http.get(url).map(response => {
            return response.json() as CustomerInfo[];
        });
    }

    // Public: Create a new customer
    public createCustomer(customer: CustomerInfo): Observable<CustomerInfo> {
        let url = this.customerApi;
        return this.http.post(url, customer).map(response => {
            return response.json() as CustomerInfo;
        });
    }

    // Public: Update a customer info
    public updateCustomer(customerId: string, customer: CustomerInfo): Observable<string> {
        let url = `${this.customerApi}/${customerId}`;
        return this.http.put(url, customer).map(response => {
            return response.json() as string;
        });
    }

    // Public: Delete a customer
    public deleteCustomer(customerId: string): Observable<CustomerInfo> {
        let url = `${this.customerApi}/${customerId}`;
        return this.http.delete(url).map(response => {
            return response.json() as CustomerInfo;
        });
    }
}
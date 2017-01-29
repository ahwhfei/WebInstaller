import { Injectable } from '@angular/core';

import { CustomerService } from './customer.service';
import { Manifest } from '../manifest';

@Injectable()
export class ApiService {
    public static get apiUrl(): string {
        let customer: string = CustomerService.customer || 'anonymous';
        return Manifest.apiUrl.replace('[customer]', customer);
    }
}
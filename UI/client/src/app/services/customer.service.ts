import { Injectable } from '@angular/core';

import { CookiesService } from '../cookies/cookies.service';

@Injectable()
export class CustomerService {
    public static get customer(): string {
        return CookiesService.get('user');
    }
}
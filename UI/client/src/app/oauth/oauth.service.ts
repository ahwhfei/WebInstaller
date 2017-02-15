import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CookiesService } from '../services/cookies.service';
import { Manifest } from '../../manifest';

export class CustomerInfo {
    address: string;
    companyName: string;
    emailAddress: string;
    firstName: string;
    id: string;
    isCasUser: boolean;
    isEntitledToGoToAssist: boolean;
    isEntitledToGoToMeeting: boolean;
    isEntitledToGoToTraining: boolean;
    isEntitledToGoToWebinar: boolean;
    isEntitledToOpenVoice: boolean;
    lastName: string;
    orgId: string;
    personId: string;
    signature: string;
};

@Injectable()
export class OauthService {

    constructor(private http: Http, private router: Router) {}

    // Private: Check if the state passed from oauth is valid
    private checkState(state: string): boolean {
        return state === window.sessionStorage.getItem('state');
    }

    // Private: Get parameter in url
    private getParamByName(name: string, url: string) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ''));
    }

    // Private: Exchange auth code for customer info and save results
    private getCustomerInfo(authorizationCode: string): Observable<CustomerInfo> {
        let bodyParams = {
            'code': authorizationCode,
            'redirectUri': Manifest.authenticationRedirectUri
        };
        return this.http.post(Manifest.onboardingApiUrl, bodyParams).map(response => {
            return response.json();
        });
    }

    // Private: Error handle
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // Public: Authenticate user and login
    public authenticate(): void {
        let code = this.getParamByName('code', ''),
            state = this.getParamByName('state', '');
        if (!!code && !!state && !!this.checkState(state)) {
            this.getCustomerInfo(code).subscribe(customer => {
                console.log(customer);
                CookiesService.put('name', `${customer.firstName} ${customer.lastName}`);
                CookiesService.put('email', customer.emailAddress);
                CookiesService.put('personId', customer.personId);
                this.router.navigate(['']);
            });
        }
        else {
            console.log('Unable to call authentication because of missing auth code and state');
            this.router.navigate(['']);
        }
    }
}
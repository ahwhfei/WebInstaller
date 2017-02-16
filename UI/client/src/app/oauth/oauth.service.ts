import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { CookiesService } from '../services/cookies.service';
import { Manifest } from '../../manifest';
import { Token } from './token';
import { Customer } from './customer';

@Injectable()
export class OauthService {
    private subject: Subject<string> = new Subject<string>();
    private _usernameObservable: Observable<string> = this.subject.asObservable();

    constructor(private http: Http, private router: Router) {
    }

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

    // Private: Exchange auth code for token from Athena
    private getTokenWithCode(code: string): Observable<Token> {
        let url = `${Manifest.trustApiUrl}/Tokens?code=${code}&redirect_uri=${Manifest.authenticationRedirectUri}&clientId=${Manifest.athenaClientId}`;
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, {}, { headers: header }).map(response => {
            return response.json() as Token;
        });
    }

    // Private: Error handle
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    // Private: Decode the JWT
    private parseJwt(token): Object {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

    // Public: Authenticate user and store user info in cookie
    public authenticate(): void {
        let code = this.getParamByName('code', ''),
            state = this.getParamByName('state', '');
        if (!!code && !!state && !!this.checkState(state)) {
            this.getTokenWithCode(code).subscribe(token => {
                let customer: Customer = this.parseJwt(token.openIdToken) as Customer;
                console.log(customer);
                CookiesService.put('name', customer.name);
                CookiesService.put('email', customer.email);
                CookiesService.put('sub', customer.sub);
                CookiesService.put('id_token', token.openIdToken);
                this.subject.next(customer.name);
                this.router.navigate(['']);
            });
        }
        else {
            console.log('Unable to call authentication because of missing auth code and state');
            this.router.navigate(['']);
        }
    }

    public get usernameObservable(): Observable<string> {
        return this._usernameObservable;
    }
}
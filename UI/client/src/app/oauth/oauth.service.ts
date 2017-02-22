import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { CookiesService } from '../services/cookies.service';
import { CustomerService } from '../services/customer.service';
import { Manifest } from '../../manifest';
import { Token } from './token';
import { Customer } from './customer';

@Injectable()
export class OauthService {
    private code: string;
    private state: string;
    private subject: Subject<string> = new Subject<string>();
    private _usernameObservable: Observable<string> = this.subject.asObservable();

    constructor(private customerService: CustomerService, private http: Http, private router: Router) {
    }

    // Private: Check if the state passed from oauth is valid
    private checkState(state: string): boolean {
        return state === window.sessionStorage.getItem('state');
    }

    // Private: Get parameter in url
    private getParamByName(name: string, url: string) {
        url = !url ? window.location.href : url;
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ''));
    }

    // Public: Exchange auth code for token from trust service
    public getTokenWithCode(): Observable<Token> {
        let url = `${Manifest.trustApiUrl}/Tokens?code=${this.code}&redirect_uri=${Manifest.authenticationRedirectUri}&clientId=${Manifest.athenaClientId}`;
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, {}, { headers: header }).map(response => {
            return response.json() as Token;
        });
    }

    // Public: Decode the JWT
    public parseJwt(token): Object {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    // Public: Init oauth handel
    public initOauth(): void {
        this.code = this.getParamByName('code', ''),
        this.state = this.getParamByName('state', '');
        if (!this.code || !this.state || !this.checkState(this.state)) {
            console.log('Unable to call authentication because of missing auth code and state');
            this.router.navigate(['']);
        }
    }

    // Public: Confirm login with current customer
    public confirmLogin(customer: Customer): void {
        CookiesService.put('name', customer.name);
        CookiesService.put('email', customer.email);
        CookiesService.put('id', customer.sub);
        this.subject.next(customer.name);
        this.router.navigate(['']);
    }

    // Public: Cancel login with current customer
    public cancelLogin(): void {
        CookiesService.remove('name');
        CookiesService.remove('email');
        CookiesService.remove('id_token');
        CookiesService.remove('id');
        this.router.navigate(['']);
    }

    public get usernameObservable(): Observable<string> {
        return this._usernameObservable;
    }
}
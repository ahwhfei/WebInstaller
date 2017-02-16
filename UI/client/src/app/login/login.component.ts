import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookiesService } from '../services/cookies.service';
import { LoginService } from './login.service';
import { OauthService } from '../oauth/oauth.service';

@Component({
    selector: 'login',
    styles: [require('./login.component.less')],
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
    public customerName: string = '';

    constructor(private loginService: LoginService, private oauthService: OauthService) {}

    ngOnInit(): void {
        this.customerName = CookiesService.get('name');
        this.oauthService.usernameObservable.subscribe(username => {
            this.customerName = username;
        });
    }

    public login(): void {
        this.loginService.login();
    }

    public logout(): void {
        this.loginService.logout();
    }
}

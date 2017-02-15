import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookiesService } from '../services/cookies.service';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    styles: [require('./login.component.less')],
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {
    public customerName: string = '';

    constructor(private loginService: LoginService, private router: Router) {}

    ngOnInit(): void {
        this.customerName = CookiesService.get('name');
    }

    public login(): void {
        this.loginService.login();
    }

    public logout(): void {
        CookiesService.remove('name');
        CookiesService.remove('email');
        CookiesService.remove('personId');
        this.customerName = '';
    }
}

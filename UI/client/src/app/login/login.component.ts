import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { CookiesService } from '../services/cookies.service';

@Component({
    providers: [],
    selector: 'login',
    styles: [require('./login.component.less')],
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService,
                private router: Router) {}

    ngOnInit(): void {}

    public login(): void {
        this.loginService.login();
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { CookiesService } from '../cookies/cookies.service';

@Component({
    providers: [],
    selector: 'login',
    styles: [require('./login.component.less')],
    template: require('./login.component.html')
})
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService,
                private router: Router) {}

    ngOnInit(): void {
        !!CookiesService.get('user') && this.redirectTo('');
    }

    public login(username: string, password: string): void {
        this.loginService.setUsername(username);
        CookiesService.put('user', username);
        this.redirectTo('');
    }

    private redirectTo(path: string ): void {
        this.router.navigate([path]);
    }
}

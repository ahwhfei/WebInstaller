import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookiesService } from '../services/cookies.service';
import { LoginService } from '../login/login.service';

@Component({
    providers: [],
    selector: 'logoff',
    styles: [],
    template: require('./logoff.component.html')
})
export class LogoffComponent implements OnInit {

    constructor(private router: Router,
                private loginService: LoginService) {}

    ngOnInit(): void {
        this.logoff();
    }

    private logoff(): void {
        CookiesService.remove('user');
        this.loginService.setUsername('');
        this.redirectTo('');
    }

    private redirectTo(path: string ): void {
        this.router.navigate([path]);
    }
}

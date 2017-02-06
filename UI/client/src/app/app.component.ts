import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApplicationListService } from './application-list/application-list.service';
import { LoginService } from './login/login.service';

import { CookiesService } from './cookies/cookies.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [],
    selector: 'app-root',
    styles: [require('./app.component.less')],
    template: require('./app.component.html')
})
export class AppComponent implements OnInit {
    constructor(private applicationListService: ApplicationListService,
                private loginService: LoginService) {}
    public applicationCount: number = 0;
    public testPromising: Promise<boolean>;
    public username: string = 'Log In';
    public isShown: boolean = false;

    ngOnInit(): void {
        let user: string = CookiesService.get('user');
        !!user && (this.username = user);

        this.applicationListService.applicationListObservable.subscribe(list =>
            this.applicationCount = list.length);

        this.loginService.usernameObservable.subscribe(username => {
            (!!username && (username.trim().length > 0)) ?
                this.username = username
                : this.username = 'Log In';
        });
    }
}

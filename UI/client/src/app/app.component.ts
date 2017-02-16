import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { ApplicationListService } from './application-list/application-list.service';
import { CookiesService } from './services/cookies.service';
import { OauthService } from './oauth/oauth.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-root',
    styles: [require('./app.component.less')],
    template: require('./app.component.html')
})
export class AppComponent implements OnInit {
    constructor(private applicationListService: ApplicationListService, private oauthService: OauthService) {}
    public applicationCount: number = 0;
    public testPromising: Promise<boolean>;
    public isShown: boolean = false;

    ngOnInit(): void {
        this.applicationListService.applicationListObservable.subscribe(list => {
            this.applicationCount = list.length;
        });
    }
}

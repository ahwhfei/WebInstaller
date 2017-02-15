import { Component, OnInit } from '@angular/core';

import { OauthService } from './oauth.service';

@Component({
    providers: [ OauthService ],
    selector: 'oauth',
    styles: [ require('./oauth.component.less') ],
    template: require('./oauth.component.html')
})
export class OauthComponent implements OnInit {

    constructor(private oauthService: OauthService) {}

    ngOnInit(): void {
        this.oauthService.authenticate();
    }
}

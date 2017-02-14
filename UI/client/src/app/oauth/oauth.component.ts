import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Manifest } from '../../manifest';
import { CookiesService } from '../services/cookies.service';

import 'rxjs/add/operator/toPromise';

@Component({
    providers: [],
    selector: 'oauth',
    styles: [require('./oauth.component.less')],
    template: require('./oauth.component.html')
})
export class OauthComponent implements OnInit {

    constructor(private http: Http, private router: Router) {}

    ngOnInit(): void {
        this.authenticate();
    }

    // Private: checks if the state passed from oauth is valid
    private checkState(state: string): boolean {
        return state === window.sessionStorage.getItem('state');
    }

    // Private: get components in state
    private getStateComponents(state: string): Object {
        let components = state.split('.');

        if (components.length === 1) {
            return {
                guid: components[0]
            };
        }

        let guid = components.splice(components.length - 1)[0];
        return {
            guid: guid,
            redirecUrl: state.replace('.' + guid, '')
        };
    }

    // Private: get parameter in url
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

    // Private: exchange auth code for customer info and save results
    private getCustomerInfo(authorizationCode: string): Promise<any> {
        let bodyParams = {
            'code': authorizationCode,
            'redirectUri': Manifest.authenticationRedirectUri
        };
        return this.http.post(Manifest.onboardingApiUrl, bodyParams)
            .toPromise()
            .then(response => response.json() as any);
    };

    // Public: authenticate user and login
    public authenticate(): void {
        let code = this.getParamByName('code', ''),
            state = this.getParamByName('state', '');
        if (!!code && !!state && !!this.checkState(state)) {
            this.getCustomerInfo(code).then(response => { console.log(response); this.router.navigate(['package']); });
        }
        else {
            console.log('Unable to call authentication because of missing auth code and state');
            this.router.navigate(['package']);
        }
    };
}

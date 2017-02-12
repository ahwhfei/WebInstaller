import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { CookiesService } from '../services/cookies.service';
import { Manifest } from '../../manifest';

@Injectable()
export class LoginService {
    constructor(private cookie: CookiesService) {}

    private getGuid(): string {
		// http://www.ietf.org/rfc/rfc4122.txt
        let s = [];
         let hexDigits = '0123456789abcdef';
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-';
        return s.join('');
    };

    private redirectToLogin(): string {
        let guid = this.getGuid(),
            state = location.protocol + '//' + location.host + '/oauth.' + guid,
            loginUrl = Manifest.athenaUri + '/core/connect/authorize?client_id=' + Manifest.athenaClientId + '&scope=' +
                    'openid%20email%20profile%20ctx_principal_aliases&response_type=code&redirect_uri=' +
                    Manifest.authenticationRedirectUri + '&state=' + state;
        window.sessionStorage.setItem('state', guid);
        return loginUrl;
    };

    public login(): void {
        let loginUrl = this.redirectToLogin();
        window.location.replace(loginUrl);
    }
}
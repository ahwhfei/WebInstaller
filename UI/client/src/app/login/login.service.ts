import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { CookiesService } from '../cookies/cookies.service';

@Injectable()
export class LoginService {
    private subject: Subject<string> = new Subject<string>();
    private _usernameObservable: Observable<string> = this.subject.asObservable();

    public setUsername(username: string) {
        this.subject.next(username);
    }

    public get usernameObservable(): Observable<string> {
        return this._usernameObservable;
    }
}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/Operator/map';

import { Application } from '../application/application';
import { ApplicationList } from './application-list';
import { Manifest } from '../manifest';

@Injectable()
export class ApplicationListService {
    private _selectedApplicationList: Array<Application> = [];
    private subject: Subject<Array<Application>> = new Subject<Array<Application>>();
    private _applicationListObservable: Observable<Array<Application>> = this.subject.asObservable();
    private applicationListApi = Manifest.apiUrl + '/applicationList';

    constructor(private http: Http) {}

    public get applicationListObservable(): Observable<Array<Application>> {
        return this._applicationListObservable;
    }

    public get selectedApplicationList(): Array<Application> {
        return this._selectedApplicationList;
    }

    public setSelectedApplicationList(list: Array<Application>): void {
        this._selectedApplicationList = list;
        this.subject.next(list);
    }

    public createApplicationList(list: ApplicationList): Observable<any> {
        return this.http.post(this.applicationListApi, list);
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

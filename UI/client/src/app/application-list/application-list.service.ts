import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Application } from '../application/application';
import { ApplicationList } from './application-list';
import { Manifest } from '../../manifest';
import { ApiService } from '../services/api.service';

@Injectable()
export class ApplicationListService {
    private _selectedApplicationList: Array<Application> = [];
    private subject: Subject<Array<Application>> = new Subject<Array<Application>>();
    private _applicationListObservable: Observable<Array<Application>> = this.subject.asObservable();
    private applicationListApi = ApiService.apiUrl + '/applicationList';

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

    public createApplicationList(list: ApplicationList): Observable<ApplicationList> {
        return this.http.post(this.applicationListApi, list)
                        .map(this.extractData);
    }

    public deleteSubscription(subscription: ApplicationList): Observable<ApplicationList> {
        let url = ApiService.apiUrl + '/applicationList/' + (subscription.id || subscription._id);
        return this.http.delete(url)
                        .map(this.extractData);
    }

    public removeSubscription(list: Array<ApplicationList>, element: ApplicationList): void {
        let i = list.findIndex(e => {
            return e.id === element.id;
        });

        if (i >= 0) {
            list.splice(i, 1);
        }
    }

    public getSubscriptionScript(id: string): string {
        return `@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('${Manifest.serverUrl}/execute/${id}'))"`;
    }

    private extractData(res: Response): ApplicationList {
        let resData = res.json();
        let appList: ApplicationList = <ApplicationList>resData;
        appList.id = resData.id || resData._id;
        return appList;
    }

    private handleError (error: Response) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }

        console.error(errMsg);
    }
}

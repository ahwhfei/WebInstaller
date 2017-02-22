import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Package } from '../package/package';
import { PackageList } from './subscription';
import { Manifest } from '../../manifest';
import { ApiService } from '../services/api.service';

@Injectable()
export class PackageListService {
    private _selectedPackageList: Array<Package> = [];
    private subject: Subject<Array<Package>> = new Subject<Array<Package>>();
    private _applicationListObservable: Observable<Array<Package>> = this.subject.asObservable();
    private applicationListApi = ApiService.apiUrl + '/applicationList';

    constructor(private http: Http) {}

    public get applicationListObservable(): Observable<Array<Package>> {
        return this._applicationListObservable;
    }

    public get selectedPackageList(): Array<Package> {
        return this._selectedPackageList;
    }

    public setSelectedPackageList(list: Array<Package>): void {
        this._selectedPackageList = list;
        this.subject.next(list);
    }

    public createPackageList(list: PackageList): Observable<PackageList> {
        return this.http.post(this.applicationListApi, list)
                        .map(this.extractData);
    }

    public deleteSubscription(subscription: PackageList): Observable<PackageList> {
        let url = ApiService.apiUrl + '/applicationList/' + (subscription.id || subscription._id);
        return this.http.delete(url)
                        .map(this.extractData);
    }

    public removeSubscription(list: Array<PackageList>, element: PackageList): void {
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

    private extractData(res: Response): PackageList {
        let resData = res.json();
        let appList: PackageList = <PackageList>resData;
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

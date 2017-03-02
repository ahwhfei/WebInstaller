import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Package } from './package';
import { ApiService } from '../services/api.service';

@Injectable()
export class PackageService {
    private applicationsApi: string = ApiService.apiUrl + '/applications';
    private postPackageApi: string = ApiService.apiUrl + '/application';

    constructor(private http: Http) {}

    public getPackages(query?: string): Observable<Package[]> {
        let queryPackagesUrl = (!query ? this.applicationsApi : (this.applicationsApi + '?q=' + query));
        return this.http.get(queryPackagesUrl)
            .map(response => {
                const data = response.json();
                let applicationsList: Package[] = [];
                data.map((e: Package) => {
                    let app: Package = e as Package;
                    app.id = e.id || e._id;

                    applicationsList.push(app);
                });

                return applicationsList;
        });
    }

    public modifyPackage(app: Package) {
        let applicationId = app.id;
        let url = this.applicationsApi + applicationId;
        return this.http.put(url, app)
            .toPromise()
            .then(response => {
                console.log(response);
            })
            .catch(this.handleError);
    }

    public deletePackage(appId: string) {
        let url = this.applicationsApi + appId;
        return this.http.delete(url)
            .toPromise()
            .then(response => {
                console.log(response);
            })
            .catch(this.handleError);
    }

    public addPackage(app: Package) {
        let url = this.postPackageApi;
        return this.http.post(url, app);
    }

    public removePackage(list: Array<Package>, element: Package): void {
        let i = list.findIndex(e => {
            return e.id === element.id;
        });

        if (i >= 0) {
            list.splice(i, 1);
        }
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Application } from './application';
import { ApiService } from '../services/api.service';

@Injectable()
export class ApplicationService {
    private applicationsApi: string = ApiService.apiUrl + '/applications';
    private postApplicationApi: string = ApiService.apiUrl + '/application';

    constructor(private http: Http) {}

    public getApplications(query?: string): Observable<Application[]> {
        let queryApplicationsUrl = (!query ? this.applicationsApi : (this.applicationsApi + '?q=' + query));
        return this.http.get(queryApplicationsUrl)
            .map(response => {
                const data = response.json();
                let applicationsList: Application[] = [];
                data.map((e: Application) => {
                    let app: Application = e as Application;
                    app.id = e.id || e._id;

                    applicationsList.push(app);
                });

                return applicationsList;
        });
    }

    public modifyApplication(app: Application) {
        let applicationId = app.id;
        let url = this.applicationsApi + applicationId;
        return this.http.put(url, app)
            .toPromise()
            .then(response => {
                console.log(response);
            })
            .catch(this.handleError);
    }

    public deleteApplication(appId: string) {
        let url = this.applicationsApi + appId;
        return this.http.delete(url)
            .toPromise()
            .then(response => {
                console.log(response);
            })
            .catch(this.handleError);
    }

    public addApplication(app: Application) {
        let url = this.postApplicationApi;
        return this.http.post(url, app);
    }

    public removeApplication(list: Array<Application>, element: Application): void {
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

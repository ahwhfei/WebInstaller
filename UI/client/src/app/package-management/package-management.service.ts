import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Application } from '../application/application';
import { ApiService } from '../services/api.service';

@Injectable()
export class PackageManagementService {
    private applicationsApi: string = ApiService.apiUrl + '/application/';

    constructor(private http: Http) {}

    public modifyApplication(app: Application) {
        let applicationId = app.id;
        let url = this.applicationsApi + applicationId;
        return this.http.put(url, app);
    }

    public deleteApplication(appId: string): Observable<Application> {
        let url = this.applicationsApi + appId;
        return this.http.delete(url)
            .map((res: Response) => {
                let app = res.json();
                app.id = app._id;
                return app as Application;
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

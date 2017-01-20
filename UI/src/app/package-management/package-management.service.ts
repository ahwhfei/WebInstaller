import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Application } from '../application/application';
import { Manifest } from '../manifest';

@Injectable()
export class PackageManagementService {
    private applicationsApi: string = Manifest.apiUrl + '/application/';

    constructor(private http: Http) {}

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

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Package } from '../package/package';
import { ApiService } from '../services/api.service';

@Injectable()
export class PackageManagementService {
    private applicationsApi: string = ApiService.apiUrl + '/package/';

    constructor(private http: Http) {}

    public modifyPackage(app: Package) {
        let applicationId = app.id;
        let url = this.applicationsApi + applicationId;
        return this.http.put(url, app);
    }

    public deletePackage(appId: string): Observable<Package> {
        let url = this.applicationsApi + appId;
        return this.http.delete(url)
            .map((res: Response) => {
                let app = res.json();
                app.id = app._id;
                return app as Package;
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

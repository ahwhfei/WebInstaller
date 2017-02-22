import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../services/api.service';
import { PackageList } from '../subscription/subscription';

@Injectable()
export class SubscriptionListService {
    private applicationListsApi: string = ApiService.apiUrl + '/applicationLists';

    constructor(private http: Http) {}

    public getSubscriptionList(): Observable<PackageList[]> {
        return this.http.get(this.applicationListsApi)
            .map((res: Response) => {
                let data = res.json();
                return data as PackageList[];
            });
    }
}

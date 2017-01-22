import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Application } from '../application/application';

@Injectable()
export class ApplicationListService {
    private _selectedApplicationList: Array<Application> = [];
    private subject: Subject<Array<Application>> = new Subject<Array<Application>>();
    private _applicationListObservable: Observable<Array<Application>> = this.subject.asObservable();

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
}

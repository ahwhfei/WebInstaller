import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs/Observable';

import { Application } from './application';
import { ApplicationService } from './application.service';
import { ApplicationListService } from '../application-list/application-list.service';

export class ApplicationWithSelected extends Application {
    isSelected: boolean;
}

@Component({
    providers: [],
    selector: 'application',
    template: require('./application.component.html'),
    styles: [require('./application.component.less')]
})
export class ApplicationComponent implements OnInit {
    public applicationList: Array<ApplicationWithSelected> = [];
    public selectedApplicationList: Array<Application> = [];
    public applicationCount: number = 0;
    public query: string;

    constructor(private applicationService: ApplicationService,
                private applicationListService: ApplicationListService,
                private route: ActivatedRoute,
                private router: Router) {}

    private setSelectedApplications(appList: Application[]): void {
        this.selectedApplicationList = this.applicationListService.selectedApplicationList;

        this.applicationList = appList as ApplicationWithSelected[];

        this.applicationList.forEach( app => {
            let i = this.selectedApplicationList.findIndex( e => {
                return e.id === app.id;
            });

            if (i >= 0) {
                app.isSelected = true;
            }
            else {
                app.isSelected = false;
            }
        });
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.applicationService.getApplications(params['q']))
            .subscribe(appList => this.setSelectedApplications(appList));
    }

    private removeApplication(list: Array<Application>, element: Application): void {
        let i = list.findIndex(e => {
            return e.id === element.id;
        });

        if (i >= 0) {
            list.splice(i, 1);
        }
    }

    public add(index: number): void {
        if (this.applicationList[index].isSelected) {
            this.applicationCount--;
            this.removeApplication(this.selectedApplicationList, this.applicationList[index]);
        } else {
            this.applicationCount++;
            this.selectedApplicationList.push(this.applicationList[index]);
        }
        this.applicationList[index].isSelected = !this.applicationList[index].isSelected;

        this.applicationListService.setSelectedApplicationList(this.selectedApplicationList);

    }
}

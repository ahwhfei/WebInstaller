import { Component, OnInit } from '@angular/core';

import { Application } from './application';
import { ApplicationService } from './application.service';
import { ApplicationListService } from '../application-list/application-list.service';

export class ApplicationWithSelected {
    application: Application;
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

    constructor(private applicationService: ApplicationService,
                private applicationListService: ApplicationListService) {}

    private getApplications(): void {
        this.applicationService.getApplications()
            .then (apps => {
                apps.map(e => {
                    let app: ApplicationWithSelected = new ApplicationWithSelected();
                    app.application = e;
                    this.applicationList.push(app);
                });

                this.setSelectedApplications();
            });
    }

    private setSelectedApplications(): void {
        this.selectedApplicationList = this.applicationListService.selectedApplicationList;

        this.applicationList.forEach( app => {
            let i = this.selectedApplicationList.findIndex( e => {
                return e.id === app.application.id;
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
        this.getApplications();
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
            this.removeApplication(this.selectedApplicationList, this.applicationList[index].application);
        } else {
            this.applicationCount++;
            this.selectedApplicationList.push(this.applicationList[index].application);
        }
        this.applicationList[index].isSelected = !this.applicationList[index].isSelected;

        this.applicationListService.setSelectedApplicationList(this.selectedApplicationList);

    }
}

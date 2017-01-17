import { Component, OnInit } from '@angular/core';

import { Application } from './application';
import { ApplicationService } from './application.service';

@Component({
    providers: [ ApplicationService ],
    selector: 'application',
    template: require('./application.component.html'),
    styles: [require('./application.component.less')]
})
export class ApplicationComponent implements OnInit {
    public applicationList: Array<Application>;
    public applicationCount: number = 0;

    constructor(private applicationService: ApplicationService) {}

    private getApplications(): void {
        this.applicationList = this.applicationService.getApplications();
    }

    ngOnInit(): void {
        this.getApplications();
        this.unSelectAllApplications();
    }

    private unSelectAllApplications(): void {
        this.applicationList.map(e => {
            e['isSelected'] = false;
        });
    }

    public add(index: number): void {
        if (this.applicationList[index]['isSelected']) {
            this.applicationCount--;
        } else {
            this.applicationCount++;
        }
        this.applicationList[index]['isSelected'] = !this.applicationList[index]['isSelected'];
    }
}

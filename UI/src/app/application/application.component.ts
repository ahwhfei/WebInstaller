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

    constructor(private applicationService: ApplicationService) {}

    private getApplications(): void {
        this.applicationList = this.applicationService.getApplications();
    }

    ngOnInit(): void {
        this.getApplications();
    }
}

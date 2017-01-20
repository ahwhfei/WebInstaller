import { Component, OnInit } from '@angular/core';

import { Application } from '../application/application';
import { ApplicationService } from '../application/application.service';

@Component({
    providers: [],
    selector: 'package-management',
    styles: [require('./package-management.component.less')],
    template: require('./package-management.component.html')
})
export class PackageManagementComponent implements OnInit {

    packageList: Application[] = [];

    currentEditPackage: number;

    constructor(private applicationService: ApplicationService) {

    }

    private getApplications(): void {
        this.applicationService.getApplications()
            .then (apps => this.packageList = apps);
    }

    ngOnInit(): void {
        this.getApplications();
    }

    editPackage(i: number): void {
        if (this.currentEditPackage === i) {
            this.currentEditPackage = -1;
        } else {
            this.currentEditPackage = i;
        }
    }

    discardChange(): void {
        this.currentEditPackage = -1;
    }
}
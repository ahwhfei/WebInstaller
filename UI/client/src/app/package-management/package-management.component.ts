import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Application } from '../application/application';
import { ApplicationService } from '../application/application.service';
import { PackageManagementService } from './package-management.service';

@Component({
    providers: [PackageManagementService],
    selector: 'package-management',
    styles: [require('./package-management.component.less')],
    template: require('./package-management.component.html')
})
export class PackageManagementComponent implements OnInit {

    packageList: Application[] = [];

    spinningPromise: Promise<any>;

    currentEditPackageIndex: number;
    currentEditPackage: Application;

    constructor(private applicationService: ApplicationService,
                private packageManagementService: PackageManagementService,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.applicationService.getApplications(params['q']))
            .subscribe(apps => this.packageList = apps);
    }

    editPackage(i: number): void {
        if (this.currentEditPackageIndex === i) { // Click Done Button
            if (!(JSON.stringify(this.currentEditPackage) === JSON.stringify(this.packageList[i]))) {
                this.packageManagementService.modifyApplication(this.currentEditPackage)
                    .subscribe(() => {
                        this.packageList[i] = this.currentEditPackage;
                });
            }
            this.currentEditPackageIndex = -1;
        } else { // Click Edit Button
            this.currentEditPackageIndex = i;
            this.currentEditPackage = {...this.packageList[i]}; // Deep copy object
        }
    }

    discardChange(i: number): void {
        this.currentEditPackageIndex = -1;
    }

    deletePackage(i: number): void {
        this.packageManagementService.deleteApplication(this.packageList[i].id)
            .subscribe((app: Application) => {
                this.currentEditPackageIndex = -1;
                if (this.packageList[i]._id === app._id) {
                    this.packageList.splice(i, 1);
                }
        });
    }
}
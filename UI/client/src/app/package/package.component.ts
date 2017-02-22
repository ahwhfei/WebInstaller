import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Package } from './package';
import { PackageService } from './package.service';
import { PackageListService } from '../subscription/subscription.service';

export class PackageWithSelected extends Package {
    isSelected: boolean;
}

@Component({
    providers: [],
    selector: 'package',
    template: require('./package.component.html'),
    styles: [require('./package.component.less')]
})
export class PackageComponent implements OnInit {
    public applicationList: Array<PackageWithSelected> = [];
    public selectedPackageList: Array<Package> = [];
    public applicationCount: number = 0;
    public query: string;
    public spinning: boolean;

    constructor(private applicationService: PackageService,
                private applicationListService: PackageListService,
                private route: ActivatedRoute,
                private router: Router) {}

    private setSelectedPackages(appList: Package[]): void {
        this.selectedPackageList = this.applicationListService.selectedPackageList;

        this.applicationList = appList as PackageWithSelected[];

        this.applicationList.forEach( app => {
            let i = this.selectedPackageList.findIndex( e => {
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
            .switchMap((params: Params) => {
                this.spinning = true;
                return this.applicationService.getPackages(params['q']);
            })
            .subscribe(appList => {
                this.setSelectedPackages(appList);
                this.spinning = false;
            });
    }

    private removePackage(list: Array<Package>, element: Package): void {
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
            this.removePackage(this.selectedPackageList, this.applicationList[index]);
        } else {
            this.applicationCount++;
            this.selectedPackageList.push(this.applicationList[index]);
        }
        this.applicationList[index].isSelected = !this.applicationList[index].isSelected;

        this.applicationListService.setSelectedPackageList(this.selectedPackageList);
    }
}

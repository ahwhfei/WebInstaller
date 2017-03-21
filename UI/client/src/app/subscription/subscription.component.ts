import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { PackageListService } from '../subscription/subscription.service';
import { Package } from '../package/package';
import { PackageList } from './subscription';
import {DragDropConfig} from '../ng2-dnd/dnd.config';
import {SortableContainer, SortableComponent} from '../ng2-dnd/sortable.component';

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [],
    selector: 'subscription',
    styles: [require('./subscription.component.less')],
    template: require('./subscription.component.html')
})
export class PackageListComponent implements OnInit {
    selectedPackageList: Array<Package>;
    toBeCreatedSubscription: PackageList;

    constructor(private applicationListService: PackageListService) {
        this.toBeCreatedSubscription = new PackageList();
        this.toBeCreatedSubscription.applications = [];
        this.toBeCreatedSubscription.name = '';
        this.toBeCreatedSubscription.description = '';
        this.toBeCreatedSubscription.script = '';
    }

    ngOnInit(): void {
        this.selectedPackageList = this.applicationListService.selectedPackageList;
        this.selectedPackageList.map(app => {
            let toBeAddedPackage: Package = new Package();
            toBeAddedPackage._id = app._id;
            this.toBeCreatedSubscription.applications.push(toBeAddedPackage);
        });
    }
}

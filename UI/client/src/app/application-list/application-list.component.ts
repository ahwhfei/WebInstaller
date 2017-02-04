import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { ApplicationListService } from '../application-list/application-list.service';
import { Application } from '../application/application';
import { ApplicationList } from './application-list';
// import { CreateSubscriptionComponent } from '../create-subscription/create-subscription.component';

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [],
    selector: 'application-list',
    styles: [require('./application-list.component.less')],
    template: require('./application-list.component.html')
})
export class ApplicationListComponent implements OnInit {
    selectedApplicationList: Array<Application>;
    toBeCreatedSubscription: ApplicationList;

    constructor(private applicationListService: ApplicationListService) {
        this.toBeCreatedSubscription = new ApplicationList();
        this.toBeCreatedSubscription.applications = [];
        this.toBeCreatedSubscription.name = '';
        this.toBeCreatedSubscription.description = '';
        this.toBeCreatedSubscription.script = '';
    }

    ngOnInit(): void {
        this.selectedApplicationList = this.applicationListService.selectedApplicationList;
        this.selectedApplicationList.map(app => this.toBeCreatedSubscription.applications.push(app));
    }
}
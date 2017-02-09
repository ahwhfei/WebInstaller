import { Component, OnInit } from '@angular/core';

import { ApplicationList } from '../application-list/application-list';
import { SubscriptionListService } from '../subscription-list/subscription-list.service';
import { ApplicationListService } from '../application-list/application-list.service';

@Component({
    providers: [SubscriptionListService],
    selector: 'subscription-management',
    styles: [require('./subscription-management.component.less')],
    template: require('./subscription-management.component.html')
})
export class SubscriptionManagementComponent implements OnInit {

    public subscriptionList: ApplicationList[] = [];

    constructor(private subscriptionListService: SubscriptionListService,
                private applicationListService: ApplicationListService) {}

    ngOnInit(): void {
        this.subscriptionListService.getSubscriptionList()
            .subscribe(data => this.subscriptionList = data);
    }

    public deleteSubscription(i: number): void {
        this.applicationListService.deleteSubscription(this.subscriptionList[i])
            .subscribe(subscription => {
                if (subscription._id === this.subscriptionList[i]._id) {
                    this.subscriptionList.splice(i, 1);
                }
            });
    }
}

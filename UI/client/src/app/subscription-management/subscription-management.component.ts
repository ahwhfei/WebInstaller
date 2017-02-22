import { Component, OnInit } from '@angular/core';

import { PackageList } from '../subscription/subscription';
import { SubscriptionListService } from '../subscription-list/subscription-list.service';
import { PackageListService } from '../subscription/subscription.service';

@Component({
    providers: [SubscriptionListService],
    selector: 'subscription-management',
    styles: [require('./subscription-management.component.less')],
    template: require('./subscription-management.component.html')
})
export class SubscriptionManagementComponent implements OnInit {

    public subscriptionList: PackageList[] = [];
    public spinning: boolean = true;

    constructor(private subscriptionListService: SubscriptionListService,
                private applicationListService: PackageListService) {}

    ngOnInit(): void {
        this.subscriptionListService.getSubscriptionList()
            .subscribe(data => {
                this.spinning = false;
                this.subscriptionList = data;
            });
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

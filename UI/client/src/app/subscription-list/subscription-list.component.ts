import { Component, OnInit } from '@angular/core';

import { PackageList } from '../subscription/subscription';
import { SubscriptionListService } from './subscription-list.service';
import { PackageListService } from '../subscription/subscription.service';

@Component({
    providers: [SubscriptionListService],
    selector: 'subscription-list',
    styles: [require('./subscription-list.component.less')],
    template: require('./subscription-list.component.html')
})
export class SubscriptionListComponent implements OnInit {

    public subscriptionList: PackageList[] = [];
    public spinning: boolean = true;

    constructor(private subscriptionListService: SubscriptionListService,
                private applicationListService: PackageListService) {}

    ngOnInit(): void {
        this.subscriptionListService.getSubscriptionList()
            .subscribe(data => {
                this.subscriptionList = data;
                this.subscriptionList.map((subscription: PackageList) => {
                    if (!subscription.script || subscription.script.length === 0) {
                        subscription.script = this.applicationListService.getSubscriptionScript(subscription.id || subscription._id);
                    }
                });
                this.spinning = false;
            });
    }
}

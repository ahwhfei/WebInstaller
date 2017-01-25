import { Component, OnInit } from '@angular/core';

import { ApplicationList } from '../application-list/application-list';
import { SubscriptionListService } from './subscription-list.service';
import { ApplicationListService } from '../application-list/application-list.service';

@Component({
    providers: [SubscriptionListService],
    selector: 'subscription-list',
    styles: [require('./subscription-list.component.less')],
    template: require('./subscription-list.component.html')
})
export class SubscriptionListComponent implements OnInit {

    public subscriptionList: ApplicationList[] = [];

    constructor(private subscriptionListService: SubscriptionListService,
                private applicationListService: ApplicationListService) {}

    ngOnInit(): void {
        this.subscriptionListService.getSubscriptionList()
            .subscribe(data => {
                this.subscriptionList = data;
                this.subscriptionList.map((subscription: ApplicationList) => {
                    if (!subscription.script || subscription.script.length === 0) {
                        subscription.script = this.applicationListService.getSubscriptionScript(subscription.id || subscription._id);
                    }
                });
            });
    }
}

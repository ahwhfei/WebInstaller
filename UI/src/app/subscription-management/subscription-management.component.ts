import { Component, OnInit } from '@angular/core';

import { ApplicationList } from '../application-list/application-list';
import { SubscriptionListService } from '../subscription-list/subscription-list.service';

@Component({
    providers: [SubscriptionListService],
    selector: 'subscription-management',
    styles: [require('./subscription-management.component.less')],
    template: require('./subscription-management.component.html')
})
export class SubscriptionManagementComponent implements OnInit {

    public subscriptionList: ApplicationList[] = [];

    constructor(private subscriptionListService: SubscriptionListService) {}

    ngOnInit(): void {
        this.subscriptionListService.getSubscriptionList()
            .subscribe(data => this.subscriptionList = data);
    }
}

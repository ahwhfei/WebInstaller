import { Component, OnInit } from '@angular/core';

import { ApplicationList } from '../application-list/application-list';
import { SubscriptionListService } from './subscription-list.service';

@Component({
    providers: [SubscriptionListService],
    selector: 'subscription-list',
    styles: [require('./subscription-list.component.less')],
    template: require('./subscription-list.component.html')
})
export class SubscriptionListComponent implements OnInit {

    public subscriptionList: ApplicationList[] = [];

    constructor(private subscriptionListService: SubscriptionListService) {}

    ngOnInit(): void {
        this.subscriptionListService.getSubscriptionList()
            .subscribe(data => this.subscriptionList = data);
    }
}

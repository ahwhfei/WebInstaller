import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

import { OauthService } from './oauth.service';
import { CustomerService } from '../services/customer.service';
import { CookiesService } from '../services/cookies.service';
import { Customer } from './customer';
import { CustomerInfo } from '../services/customer-info';

@Component({
    selector: 'oauth',
    styles: [ require('./oauth.component.less') ],
    template: require('./oauth.component.html')
})
export class OauthComponent implements OnInit {
    @ViewChild(ModalDialogComponent)
    public readonly modal: ModalDialogComponent;
    private customer: Customer;
    public isAuthening: boolean = true;

    constructor(private customerService: CustomerService, private oauthService: OauthService) {}

    ngOnInit(): void {
        this.modal.show();
        this.oauthService.initOauth();
        this.authenticate();
    }

    public confirmLogin(): void {
        let customerToCreate: CustomerInfo = new CustomerInfo;
        customerToCreate.id = this.customer.sub;
        customerToCreate.name = this.customer.name;
        customerToCreate.email = this.customer.email;
        this.customerService.createCustomer(customerToCreate).subscribe(response => {
            this.oauthService.confirmLogin(this.customer);
        });
    }

    public cancelLogin(): void {
        this.modal.hide();
        this.oauthService.cancelLogin();
    }

    // Public: Authenticate user and store user info in cookie
    public authenticate(): void {
        this.oauthService.getTokenWithCode().subscribe(token => {
            CookiesService.put('id_token', token.openIdToken);
            this.customer = this.oauthService.parseJwt(token.openIdToken) as Customer;
            this.customerService.getCustomer(this.customer.sub).subscribe(response => {
                if (!!response.length && (response[0].id === this.customer.sub)) {
                    this.oauthService.confirmLogin(this.customer);
                }
                this.isAuthening = false;
            });
        });
    }
}

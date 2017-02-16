import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Router } from '@angular/router';
import { OauthService } from './oauth.service';

@Component({
    selector: 'oauth',
    styles: [ require('./oauth.component.less') ],
    template: require('./oauth.component.html')
})
export class OauthComponent implements OnInit {
    @ViewChild(ModalDialogComponent)
    public readonly modal: ModalDialogComponent;

    constructor(private oauthService: OauthService, private router: Router) {}

    ngOnInit(): void {
        if (window.location.search.indexOf('code') !== -1 && window.location.search.indexOf('state') !== -1) {
            this.modal.show();
        } else {
            this.router.navigate(['']);
        }
    }

    public confirmLogin(): void {
        this.oauthService.authenticate();
    }

    public cancelLogin(): void {
        this.modal.hide();
        this.router.navigate(['']);
    }
}

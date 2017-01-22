import { Component, ViewChild, Input } from '@angular/core';

import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Application } from '../application/application';

@Component({
    selector: 'create-subscription',
    styles: [require('./create-subscription.component.less')],
    template: require('./create-subscription.component.html')
})
export class CreateSubscriptionComponent {
    @ViewChild(ModalDialogComponent)
    public readonly modal: ModalDialogComponent;

    @Input()
    public applicationList: Application[];
}
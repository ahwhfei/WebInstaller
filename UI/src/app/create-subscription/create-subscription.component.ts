import { Component, ViewChild, Input, ElementRef } from '@angular/core';

import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Application } from '../application/application';
import { ApplicationList } from '../application-list/application-list';
import { ApplicationListService } from '../application-list/application-list.service';

@Component({
    selector: 'create-subscription',
    styles: [require('./create-subscription.component.less')],
    template: require('./create-subscription.component.html')
})
export class CreateSubscriptionComponent {
    @ViewChild(ModalDialogComponent)
    public readonly modal: ModalDialogComponent;

    @Input()
    public subscription: ApplicationList;

    public disableGeneration: boolean = false;
    public copyButtonText: string = 'Copy';

    constructor(private applicationListService: ApplicationListService) {}

    public generateCommand(name: string, description: string): void {
        this.subscription.name = name.trim() || 'anonymous temporary subscription';
        this.subscription.description = description.trim() || '';
        this.subscription.createDate = new Date().toUTCString();

        this.applicationListService.createApplicationList(this.subscription)
            .subscribe(
                (appList: ApplicationList) => {
                    let executeString: string = this.applicationListService.getSubscriptionScript(appList.id || appList._id);
                    this.subscription.script = executeString;
                    this.disableGeneration = true;
                }
            );
    }

    public copyCommand(): void {
        this.copyButtonText = 'Copied';

        setTimeout(() => {
            this.copyButtonText = 'Copy';
        }, 3000);
    }
}
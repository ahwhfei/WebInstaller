import { Component, ViewChild, Input } from '@angular/core';

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

    script: string = '';

    constructor(private applicationListService: ApplicationListService) {}

    public generateCommand(name: string, description: string): void {
        this.subscription.name = name.trim();
        this.subscription.description = description.trim();

        this.applicationListService.createApplicationList(this.subscription)
            .subscribe(
                (appList: ApplicationList) => {
                    console.log(appList);
                    let executeString: string = `@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('http://localhost:3002/execute/${appList.id}'))"`;

                    this.subscription.script = executeString;
                    this.script = executeString;
                }
            );
    }

    public copyCommand(): void {
        console.log(this.subscription.script);
    }
}
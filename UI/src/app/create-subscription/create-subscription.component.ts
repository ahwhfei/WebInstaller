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
    public applicationList: Application[];

    installationCommand: string = '';

    constructor(private applicationListService: ApplicationListService) {}

    public generateCommand(): void {
        let list: ApplicationList = new ApplicationList();
        list.name = 'test';
        list.description = 'description';
        list.applications = [];
        this.applicationList.map(app => list.applications.push(app));

        this.applicationListService.createApplicationList(list)
            .subscribe(
                (appList: ApplicationList) => {
                    console.log(appList);
                    let executeString: string = `@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('http://localhost:3002/execute/${appList.id}'))"`;

                    this.installationCommand = executeString;
                }
            );
    }
}
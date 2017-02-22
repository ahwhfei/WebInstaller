import { Component, ViewChild, Input, ElementRef } from '@angular/core';

import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Package } from '../package/package';
import { PackageList } from '../subscription/subscription';
import { PackageListService } from '../subscription/subscription.service';
import { CookiesService } from '../services/cookies.service';

@Component({
    selector: 'create-subscription',
    styles: [require('./create-subscription.component.less')],
    template: require('./create-subscription.component.html')
})
export class CreateSubscriptionComponent {
    @ViewChild(ModalDialogComponent)
    public readonly modal: ModalDialogComponent;

    @Input()
    public subscription: PackageList;

    public disableGeneration: boolean = false;
    public copyButtonText: string = 'Copy';

    constructor(private applicationListService: PackageListService) {}

    public generateCommand(name: string, description: string): void {
        this.subscription.name = name.trim() || 'anonymous temporary subscription';
        this.subscription.description = description.trim() || '';
        this.subscription.customer = CookiesService.get('name');

        this.applicationListService.createPackageList(this.subscription)
            .subscribe(
                (appList: PackageList) => {
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
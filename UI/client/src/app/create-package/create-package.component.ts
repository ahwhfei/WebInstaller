import { Component } from '@angular/core';

import { Application, ApplicationExt } from '../application/application';
import { ApplicationService } from '../application/application.service';

@Component({
    providers: [],
    selector: 'create-package',
    styles: [require('./create-package.component.less')],
    template: require('./create-package.component.html')
})
export class CreatePackageComponent {
    toBeCreatedPackage: Application = new Application();

    constructor(private applicationService: ApplicationService) {}

    savePackage() {
    this.applicationService.addApplication(this.toBeCreatedPackage)
            .subscribe(() => {
                ApplicationExt.reset(this.toBeCreatedPackage);
            });
    }
}

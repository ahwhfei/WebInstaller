import { Component } from '@angular/core';

import { Application } from '../application/application';
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

    savePackage(): void {
        console.log(this.toBeCreatedPackage);
        this.applicationService.addApplication(this.toBeCreatedPackage);
    }
}

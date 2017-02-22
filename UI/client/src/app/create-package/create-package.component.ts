import { Component } from '@angular/core';

import { Package, PackageExt } from '../package/package';
import { PackageService } from '../package/package.service';

@Component({
    providers: [],
    selector: 'create-package',
    styles: [require('./create-package.component.less')],
    template: require('./create-package.component.html')
})
export class CreatePackageComponent {
    toBeCreatedPackage: Package = new Package();

    constructor(private applicationService: PackageService) {}

    savePackage() {
    this.applicationService.addPackage(this.toBeCreatedPackage)
            .subscribe(() => {
                PackageExt.reset(this.toBeCreatedPackage);
            });
    }
}

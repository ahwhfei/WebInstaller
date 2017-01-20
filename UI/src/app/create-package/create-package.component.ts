import { Component } from '@angular/core';

import { Application } from '../application/application';

@Component({
    providers: [],
    selector: 'create-package',
    styles: [require('./create-package.component.less')],
    template: require('./create-package.component.html')
})
export class CreatePackageComponent {
    toBeCreatedPackage: Application = new Application();
}

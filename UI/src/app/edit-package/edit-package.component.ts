import { Component, Input } from '@angular/core';

import { Application } from '../application/application';

@Component({
    providers: [],
    selector: 'edit-package',
    styles: [require('./edit-package.component.less')],
    template: require('./edit-package.component.html')
})
export class EditPackageComponent {
    @Input()
    package: Application;
}

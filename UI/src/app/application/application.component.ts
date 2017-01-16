import { Component } from '@angular/core';

import { Application } from './application';

@Component({
  selector: 'application',
  template: require('./application.component.html'),
  styles: [require('./application.component.less')]
})
export class ApplicationComponent {
    public applicationList: Array<Application> = [
    ];
}

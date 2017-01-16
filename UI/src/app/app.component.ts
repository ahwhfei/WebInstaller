import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: require('./app.component.html'),
  styles: [require('./app.component.less')]
})
export class AppComponent {
}

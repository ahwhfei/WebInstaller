import {Component, Input} from '@angular/core';

export enum SpinnerComponentColor {
    blue,
    gray,
    green,
    white
}

export enum SpinnerComponentSize {
    medium,
    small,
    xs
}

@Component({
    selector: 'spinner',
    styles: [require('./spinner.component.less')],
    template: require('./spinner.component.html')
})
export class SpinnerComponent {

    /* tslint:disable:no-unused-variable */
    @Input() public color: SpinnerComponentColor;
    @Input() public cssClass: string;
    @Input() public size: SpinnerComponentSize;
    @Input() public spinning: boolean;
    /* tslint:enable:no-unused-variable */
}

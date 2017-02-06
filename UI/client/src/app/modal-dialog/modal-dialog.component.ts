import { Component } from '@angular/core';

@Component({
    selector: 'modal-dialog',
    styles: [require('./modal-dialog.component.less')],
    template: require('./modal-dialog.component.html')
})
export class ModalDialogComponent {

    public visible: boolean = false;
    private visibleAnimate: boolean = false;

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }
}
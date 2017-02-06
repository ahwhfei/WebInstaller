// Copyright © Citrix Systems, Inc. All rights reserved.

import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, Output} from '@angular/core';

export enum CtxSpinnerComponentColor {
    blue,
    gray,
    green,
    white
}

export enum CtxSpinnerComponentSize {
    medium,
    small,
    xs
}

@Component({
    selector: 'ctx-spinner-2',
    template: require('./ctx-spinner.component.html')
})
export class CtxSpinnerComponent implements OnChanges, OnDestroy {

    /* tslint:disable:no-unused-variable */
    @Input() public color: CtxSpinnerComponentColor;
    @Input() public cssClass: string;
    @Input() public promise: Promise<any>;
    @Input() public size: CtxSpinnerComponentSize;
    @Output() public spinning: boolean = false;
    /* tslint:enable:no-unused-variable */

    public spinningPromise: Promise<void> = Promise.resolve();

    private resolve: () => void;

    constructor(private ref: ChangeDetectorRef) {
    }

    public ngOnChanges(changes) {
        if (!changes.promise ||
            !changes.promise.currentValue) {
            return;
        }

        if (this.resolve) {
            this.resolve();
        }

        this.spinning = true;

        this.spinningPromise = new Promise(resolve => {
            this.resolve = resolve;
            changes.promise.currentValue.then(resolve, resolve);
        }).then(
            () => {
                this.spinning = false;
                this.ref.detectChanges();
            },
            () => {
                this.spinning = false;
                this.ref.detectChanges();
            });
    }

    public ngOnDestroy() {
        this.ref.detach();
    }
}

// Copyright © Yuanyuan Zhang(yuanyuan.zhang@citrix.com), Inc. All rights reserved.

import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, Output} from '@angular/core';

@Component({
    selector: 'loading-spinner',
    styles: [require('./loading-spinner.component.less')],
    template: require('./loading-spinner.component.html')
})
export class LoadingSpinnerComponent implements OnChanges, OnDestroy {

    /* tslint:disable:no-unused-variable */
    @Input() public promise: Promise<any>;
    @Output() public loading: boolean = false;
    /* tslint:enable:no-unused-variable */

    public loadingPromise: Promise<void> = Promise.resolve();

    private resolve: () => void;

    constructor(private ref: ChangeDetectorRef) {
    }

    public ngOnChanges(changes) {
        if (!changes.promise || !changes.promise.currentValue) {
            return;
        }

        if (this.resolve) {
            this.resolve();
        }

        this.loading = true;

        this.loadingPromise = new Promise(resolve => {
            this.resolve = resolve;
            changes.promise.currentValue.then(resolve, resolve);
        }).then(
            () => this.hideSpinner(),
            () => this.hideSpinner() 
            );           
    }

    public ngOnDestroy() {
        this.ref.detach();
    }

    private hideSpinner() {
        this.loading = false;
        this.ref.detectChanges();
    }
}

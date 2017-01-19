import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApplicationListService } from './application-list/application-list.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [],
    selector: 'app-root',
    styles: [require('./app.component.less')],
    template: require('./app.component.html')
})
export class AppComponent implements OnInit {
    constructor(private applicationListService: ApplicationListService) {}
    public applicationCount: number = 0;

    ngOnInit(): void {
        this.applicationListService.applicationListObservable.subscribe(list => {
            this.applicationCount = list.length;
        })
    }
}

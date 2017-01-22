import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApplicationListService } from '../application-list/application-list.service';
import { Application } from '../application/application';
import { ApplicationList } from './application-list';

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [],
    selector: 'application-list',
    styles: [require('./application-list.component.less')],
    template: require('./application-list.component.html')
})
export class ApplicationListComponent implements OnInit {
    selectedApplicationList: Array<Application>;
    constructor(private applicationListService: ApplicationListService) {
    }

    ngOnInit(): void {
        this.selectedApplicationList = this.applicationListService.selectedApplicationList;
    }

    public generateCommand(): void {
        console.log('generateCommand');
        let applicationList: ApplicationList = new ApplicationList();
        applicationList.name = 'test';
        applicationList.description = 'description';
        applicationList.applications = [];
        this.selectedApplicationList.map(app => applicationList.applications.push(app));

        console.log(applicationList);
        
        this.applicationListService.createApplicationList(applicationList)
            .subscribe();
    }
}

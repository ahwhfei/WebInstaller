import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    providers: [],
    selector: 'search-bar',
    styles: [require('./search-bar.component.less')],
    template: require('./search-bar.component.html')
})
export class SearchBarComponent {

    constructor(private router: Router) {}
    public search(keyword: string): void {
        console.log(keyword);
    }
}

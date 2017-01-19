import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ApplicationListService } from './application-list/application-list.service';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    ApplicationListComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/package',
        pathMatch: 'full'
      },
      {
        path: 'package',
        component: ApplicationComponent
      },
      {
        path: 'subscribe',
        component: ApplicationListComponent
      }
    ])],
  providers: [ApplicationListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

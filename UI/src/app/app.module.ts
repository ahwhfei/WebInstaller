import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationListService } from './application-list/application-list.service';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    ApplicationListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/application',
        pathMatch: 'full'
      },
      {
        path: 'application',
        component: ApplicationComponent
      },
      {
        path: 'list',
        component: ApplicationListComponent
      }
    ])],
  providers: [ApplicationListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

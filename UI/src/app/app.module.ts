import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationListComponent } from './application-list/application-list.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

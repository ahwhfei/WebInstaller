import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PackageManagementComponent } from './package-management/package-management.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { EditPackageComponent } from './edit-package/edit-package.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { ApplicationListService } from './application-list/application-list.service';
import { ApplicationService } from './application/application.service';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { CreateSubscriptionComponent} from './create-subscription/create-subscription.component';
import { CtxSpinnerComponent } from './ctx-spinner/ctx-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    ApplicationListComponent,
    LoadingSpinnerComponent,
    PackageManagementComponent,
    SubscriptionComponent,
    EditPackageComponent,
    CreatePackageComponent,
    SearchBarComponent,
    ModalDialogComponent,
    CreateSubscriptionComponent,
    CtxSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
        path: 'package-management',
        component: PackageManagementComponent
      },
      {
        path: 'subscription',
        component: SubscriptionComponent
      },
      {
        path: 'create',
        component: CreatePackageComponent
      },
      {
        path: 'subscribe',
        component: ApplicationListComponent
      }
    ])],
  providers: [
    ApplicationListService,
    ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

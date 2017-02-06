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
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { EditPackageComponent } from './edit-package/edit-package.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { ApplicationListService } from './application-list/application-list.service';
import { ApplicationService } from './application/application.service';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { CreateSubscriptionComponent} from './create-subscription/create-subscription.component';
import { CtxSpinnerComponent } from './ctx-spinner/ctx-spinner.component';
import { ClipboardDirective } from './clipboard/clipboard.directive';
import { LoginComponent } from './login/login.component';
import { LogoffComponent } from './logoff/logoff.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    ApplicationListComponent,
    LoadingSpinnerComponent,
    PackageManagementComponent,
    SubscriptionListComponent,
    SubscriptionManagementComponent,
    EditPackageComponent,
    ClipboardDirective,
    CreatePackageComponent,
    SearchBarComponent,
    ModalDialogComponent,
    CreateSubscriptionComponent,
    CtxSpinnerComponent,
    LoginComponent,
    LogoffComponent
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
        component: SubscriptionListComponent
      },
      {
        path: 'subscription-management',
        component: SubscriptionManagementComponent
      },
      {
        path: 'create',
        component: CreatePackageComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logoff',
        component: LogoffComponent
      },
      {
        path: 'subscribe',
        component: ApplicationListComponent
      }
    ])],
  providers: [
    ApplicationListService,
    ApplicationService,
    LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

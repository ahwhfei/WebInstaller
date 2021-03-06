import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PackageComponent } from './package/package.component';
import { PackageManagementComponent } from './package-management/package-management.component';
import { SubscriptionManagementComponent } from './subscription-management/subscription-management.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { LoginComponent } from './login/login.component';
import { OauthComponent } from './oauth/oauth.component';
import { PackageListComponent } from './subscription/subscription.component';

const appRoutes: Routes = [
    {
        path: 'package',
        component: PackageComponent
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
        path: 'oauth',
        component: OauthComponent
    },
    {
        path: 'subscribe',
        component: PackageListComponent
    },
    {
        path: '',
        redirectTo: '/package',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

import { Component, NgZone, OnInit } from '@angular/core';

// Google's login API namespace
declare var gapi: any;

@Component({
    selector: 'google-login',
    styles: [require('./google-login.component.less')],
    template: require('./google-login.component.html')
})
export class LoginComponent {
    public googleLoginButtonId: string = 'google-login-button';
    public userAuthToken: string = '';
    public userDisplayName: string = '';

    constructor(private _zone: NgZone) {}

    // Angular hook that allows for interaction with elements inserted by the rendering of a view.
    ngAfterViewInit() {
        // Converts the Google login button stub to an actual button.
        gapi.signin2.render(
            this.googleLoginButtonId,
            {
                'onSuccess': this.onGoogleLoginSuccess,
                'onFailure': this.onGoogleLoginFailure,
                'scope': 'profile',
                'longtitle': false,
                'theme': 'dark'
            });
    }

    // Triggered after a user successfully logs in using the Google external login provider.
    private onGoogleLoginSuccess = (loggedInUser) => {
        this._zone.run(() => {
            let profile = loggedInUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            this.userAuthToken = loggedInUser.getAuthResponse().id_token;
            this.userDisplayName = profile.getName();
        });
    }

    private onGoogleLoginFailure(error): void {
        console.log(error);
    }

    public signOut(): void {
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
}
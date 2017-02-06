import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { Manifest } from './manifest';

if (Manifest.production) {
    enableProdMode();
    disableDebugTools();
}

platformBrowserDynamic().bootstrapModule(AppModule);

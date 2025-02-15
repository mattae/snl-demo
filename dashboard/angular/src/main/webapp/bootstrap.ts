import { appConfig } from './app/app.config';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));

if (!environment.production) {
    const {worker} = require('./app/providers/mocks/browser');
    worker.start({
        onUnhandledRequest: 'bypass',
    });
}

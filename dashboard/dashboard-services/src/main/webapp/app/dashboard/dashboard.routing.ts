import { inject, isDevMode, provideEnvironmentInitializer } from '@angular/core';
import { StylesheetService } from '@mattae/angular-shared';
import { Routes } from '@angular/router';
import { DashboardService } from './dashboard.service';

export default [
    {
        path: '',
        //component: WrapperComponent,
        providers: [
            provideEnvironmentInitializer(() => {
                inject(StylesheetService).loadStylesheet(isDevMode() ? 'http://localhost:26561/styles.css' : '/js/dashboard/styles.css');
            }),
            DashboardService
        ],
        children: [
            {
                path: '',
                data: {
                    title: 'PLUGINS.DASHBOARD.MENU'
                },
                loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent)
            },
        ]
    }
] as Routes

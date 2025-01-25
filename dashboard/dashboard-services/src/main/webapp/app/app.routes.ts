import { Routes } from '@angular/router';



export const APP_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
        data: {
            layout: 'classy'
        },
        children: [
            {
                path: '',
                loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.routing')
            }
        ]
    }
];

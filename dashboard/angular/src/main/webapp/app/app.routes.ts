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
                path: 'barchart',
                loadComponent: () => import('./dashboard/grouped-barchart.component').then(c => c.GroupedBarchartComponent)
            },
            {
                path: 'line-chart',
                loadComponent: () => import('./dashboard/line-chart.component').then(c => c.LineChartComponent)
            }
        ]
    }
];

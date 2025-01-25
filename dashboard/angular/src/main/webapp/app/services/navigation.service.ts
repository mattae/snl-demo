import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@mattae/angular-shared';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    navigations(): FuseNavigationItem[] {
        return [
            {
                title:'Home',
                type: 'basic',
                link: '/',
                icon: 'heroicons_outline:home'
            },
            {
                title:'Barchart',
                type: 'basic',
                link: 'barchart',
                icon: 'heroicons_outline:home'
            },
            {
                title:'Line Chart',
                type: 'basic',
                link: 'line-chart',
                icon: 'heroicons_outline:home'
            },
        ]
    }
}

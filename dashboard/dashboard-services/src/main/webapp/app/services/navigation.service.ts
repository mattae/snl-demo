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
                title:'Dashboard',
                type: 'basic',
                link: 'dashboard',
                icon: 'heroicons_outline:home'
            },
        ]
    }
}

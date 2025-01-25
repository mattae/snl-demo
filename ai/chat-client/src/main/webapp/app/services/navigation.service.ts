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
                title:'FLOWABLE.MENU.WORK',
                type: 'collapsable',
                icon: 'mat_outline:work_outline',
                children: [
                    {
                        title:'FLOWABLE.MENU.OPEN',
                        link: 'work/running',
                        type:'basic'
                    },
                    {
                        title:'FLOWABLE.MENU.COMPLETED',
                        link: 'work/completed',
                        type:'basic'
                    },
                    {
                        title:'FLOWABLE.MENU.ALL',
                        link: 'work/all',
                        type:'basic'
                    },
                    {
                        title:'FLOWABLE.MENU.NEW',
                        link: 'work/new',
                        type:'basic'
                    }
                ]
            },
            {
                title:'FLOWABLE.MENU.TASK',
                type: 'collapsable',
                icon: 'heroicons_outline:clipboard-document-check',
                children: [
                    {
                        title:'FLOWABLE.MENU.FOR_ME',
                        link: 'tasks/for-me',
                        type:'basic'
                    },
                    {
                        title:'FLOWABLE.MENU.UNASSIGNED',
                        link: 'tasks/unassigned',
                        type:'basic'
                    },
                    {
                        title:'FLOWABLE.MENU.OPEN',
                        link: 'tasks/running',
                        type:'basic'
                    },
                    {
                        title:'FLOWABLE.MENU.COMPLETED',
                        link: 'tasks/completed',
                        type:'basic'
                    },
                    {
                        title:'FLOWABLE.MENU.ALL',
                        link: 'tasks/all',
                        type:'basic'
                    },
                    {
                        title:'FLOWABLE.MENU.NEW',
                        link: 'tasks/new',
                        type:'basic'
                    }
                ]
            },
            {
                title:'Builder',
                type: 'basic',
                link: 'builder',
                icon: 'heroicons_outline:home'
            },
        ]
    }
}

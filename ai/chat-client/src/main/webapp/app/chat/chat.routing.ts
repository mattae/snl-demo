import { inject, isDevMode, provideEnvironmentInitializer } from '@angular/core';
import { StylesheetService } from '@mattae/angular-shared';
import { Routes } from '@angular/router';
import { ChatService } from './chat.service';

export default [
    {
        path: '',
        //component: WrapperComponent,
        providers: [
            provideEnvironmentInitializer(() => {
                inject(StylesheetService).loadStylesheet(isDevMode() ? 'http://localhost:13856/styles.css' : '/js/chat/styles.css');
            }),
            ChatService
        ],
        children: [
            {
                path: '',
                data: {
                    title: 'PLUGINS.CHAT_SERVICES.MENU'
                },
                loadComponent: () => import('./chat.component').then(c => c.ChatComponent)
            },
        ]
    }
] as Routes

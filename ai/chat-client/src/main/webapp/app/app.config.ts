import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import {
    PreloadAllModules,
    provideRouter,
    withDebugTracing,
    withInMemoryScrolling,
    withPreloading
} from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './providers/transloco-httpLoader';
import { provideIcons } from './providers/icons.provider';
import { provideFuse } from './providers/fuse.provider';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { AccountService } from '@mattae/angular-shared';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MockAccountService } from './services/mock-account.service';

import { provideInterceptor } from './services/authentication.interceptor';

// @ts-ignore
window.EasyMDE = EasyMDE;

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: AccountService,
            useClass: MockAccountService
        },
        provideAnimationsAsync(),
        provideHttpClient(),
        provideExperimentalZonelessChangeDetection(),
        provideRouter(APP_ROUTES,
            withDebugTracing(),
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
        ),
        provideTransloco({
            config: {
                availableLangs: [
                    {
                        id: 'en',
                        label: 'English',
                    }
                ],
                defaultLang: 'en',
                fallbackLang: 'en',
                reRenderOnLangChange: true,
                prodMode: true,
                missingHandler: {
                    useFallbackTranslation: true
                }
            },
            loader: TranslocoHttpLoader
        }),
        provideInterceptor(),
        provideIcons(),
        provideTransloco({
            config: {
                availableLangs: [
                    {
                        id: 'en',
                        label: 'English',
                    },
                    {
                        id: 'fr',
                        label: 'Français'
                    },
                    {
                        id: 'ha',
                        label: 'Hausa'
                    },
                    {
                        id: 'ig',
                        label: 'Igbo'
                    },
                    {
                        id: 'yo',
                        label: 'Yoruba'
                    },
                    {
                        id: 'es',
                        label: 'Español'
                    },
                    {
                        id: 'pt',
                        label: 'Português'
                    }
                ],
                defaultLang: 'en',
                fallbackLang: 'en',
                reRenderOnLangChange: true,
                prodMode: true,
                missingHandler: {
                    useFallbackTranslation: true
                }
            },
            loader: TranslocoHttpLoader
        }),
        provideIcons(),
        provideLuxonDateAdapter({
            parse: {
                dateInput: 'D',
            },
            display: {
                dateInput: 'DD',
                monthYearLabel: 'LLL yyyy',
                dateA11yLabel: 'DD',
                monthYearA11yLabel: 'LLLL yyyy',
            },
        }),
        provideFuse({
            fuse: {
                layout: 'classy',
                scheme: 'light',
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1280px',
                    xl: '1440px',
                }
            },
        })
    ]
};
